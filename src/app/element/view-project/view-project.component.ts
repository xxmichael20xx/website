import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { CommonService } from 'src/app/services/common.service';
import { projects } from 'src/app/service-interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProjectFormComponent } from 'src/app/dashboard/project-form/project-form.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  public project_id: number;
  public project: projects = null;
  public fronts: any[] = [];
  public backs: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private projectService: ProjectService,
    private common: CommonService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewProjectComponent>
  ) {
    this.project_id = this.dialogData.project_id;
  }

  ngOnInit(): void {
    this.projectService.getOneProject(this.project_id).subscribe(data => {
      if (data) {
        this.project = data;

        this.projectService.getProjectDetails(this.project_id).subscribe(datas => {
          if (datas.length > 0) {
            datas.forEach((element, index) => {
              if (element.category == "Front-End") {
                this.fronts.push(element);
              } else {
                this.backs.push(element);
              }
            });
          }
        });
      }
    });
  }

  deleteProject() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Are you sure?",
        content: "Project will be removed!"
      },
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(this.project_id).subscribe(deleteResult => {
          if (deleteResult) {
            this.dialogRef.close({
              status: "deleted",
              title: "Project has been moved to trashed!"
            });
          }
        });
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  updateProject() {
    this.dialogRef.close();

    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: {
        project_id: this.project_id
      },
      width: "45%",
      autoFocus: false
    });
  }

}
