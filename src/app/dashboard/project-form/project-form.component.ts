import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/element/confirm-dialog/confirm-dialog.component';
import { projects, projectDetail } from 'src/app/service-interface';
import { ViewProjectComponent } from 'src/app/element/view-project/view-project.component';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  public form: FormGroup;
  public title: string;
  public subTitle: string;
  public update: boolean = false;
  public project_id: number;
  public project: projects;
  public ids: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private common: CommonService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private formBuilder: FormBuilder
  ) {
    if (this.dialogData.type == "add") {
      this.update = false;
      this.title = "New Project Information";
      this.subTitle = "New Project will be added!";
    } else {
      this.update = true;
      this.project_id = this.dialogData.project_id;
      this.title = "Update Project Information";
      this.subTitle = "Project information will be updated!";
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      others: this.formBuilder.array([])
    });

    if (this.update) {
      this.projectService.getOneProject(this.project_id).subscribe(data => {
        if (data) {
          this.form.patchValue({
            title: data.title,
            description: data.description
          });
        }
      });
      this.projectService.getProjectDetails(this.project_id).subscribe(data => {
        if (data.length > 0) {
          data.forEach(element => {
            this.addOthersVal(element);
          });
        }
      });
    } else {
      this.addOthers();
    }
  }

  others(): FormArray {
    return this.form.get('others') as FormArray;
  }

  newOthers(): FormGroup {
    return this.formBuilder.group({
      category: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  newOthersVal(data: projectDetail): FormGroup {
    return this.formBuilder.group({
      category: [data['category'], Validators.required],
      details: [data['details'], Validators.required],
      id: [data['id']]
    });
  }

  addOthers() {
    this.others().push(this.newOthers());
  }

  addOthersVal(data: projectDetail) {
    this.others().push(this.newOthersVal(data));
  }

  removeOthers(index: number) {
    let id = this.form.get("others").value[index]["id"];
    if (id !== undefined) {
      this.ids.push(id);
    }
    this.others().removeAt(index);
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Are you sure?",
        content: this.subTitle
      },
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.update) {
        this.updateForm();
      } else {
        this.addForm();
      }
    });
  }

  addForm() {
    let project = {
      title: this.form.get("title").value,
      description: this.form.get("description").value
    };

    this.projectService.addProject(project).subscribe(addData => {
      if (addData) {
        this.projectService.getLatestProject().subscribe(getData => {
          let project_id = getData['id'];
          let projectDetailsTemp = this.form.get("others").value;

          projectDetailsTemp.forEach((element: any, index: number) => {
            let temp = {
              project_id: project_id,
              category: element.category,
              details: element.details
            };

            this.projectService.addProjectDetail(temp).subscribe(result => {
              console.log(result);
            });

            if (index + 1 == projectDetailsTemp.length) {
              this.dialogRef.close({
                status: "added",
                title: "New Project has been added"
              });
            }
          });
        });
      }
    });
  }

  updateForm() {
    let project = {
      id: this.project_id,
      title: this.form.get("title").value,
      description: this.form.get("description").value
    };

    this.projectService.updateProject(project).subscribe(updateData => {
      if (updateData) {
        let projectDetailsTemp = this.form.get("others").value;

        projectDetailsTemp.forEach((element: any, index: number) => {
          if (element.id == undefined) {
            let temp = {
              project_id: this.project_id,
              category: element.category,
              details: element.details
            };

            this.projectService.addProjectDetail(temp).subscribe(result => {
              // console.log(result);
            });

          } else {
            let temp = {
              id: element.id,
              category: element.category,
              details: element.details
            };

            this.projectService.updateProjectDetail(temp).subscribe(result => {
              // console.log(result);
            });
          }

          if (index + 1 == projectDetailsTemp.length) {
            this.ids.forEach(idElement => {
              this.projectService.deleteProjectDetail(idElement).subscribe(result => {
                console.log(result);
              });
            });

            this.dialogRef.close({
              status: "updated",
              title: "Project information has been updated!"
            });

            const dialogRef = this.dialog.open(ViewProjectComponent, {
              data: {
                project_id: this.project_id
              },
              width: "45%"
            });
          }
        });
      }
    });
  }

}
