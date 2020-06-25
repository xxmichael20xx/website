import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { CmsService } from 'src/app/services/cms.service';
import { cms, skill } from 'src/app/service-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/element/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  public displayedColumns: string[] = ['title', 'created_at', 'action'];
  public dataSource: MatTableDataSource<any>;
  public cmss: cms[] = []
  public form: FormGroup;
  public update: boolean;
  public title: string = "Are you sure";
  public subTitle: string = "New content will be added!";

  public displayedColumnsSkill: string[] = ['category', 'title', 'count', 'created_at', 'action'];
  public dataSourceSkill: MatTableDataSource<any>;
  public skills: skill[] = []
  public formSkill: FormGroup;
  public updateSkill: boolean;
  public titleSkill: string = "Are you sure";
  public subTitleSkill: string = "New skill will be registered!";
  public value: number = 0;

  public colors: any[] = [
    { "color": "bg-success", "label": "Green"},
    { "color": "bg-primary", "label": "Blue"},
    { "color": "bg-info", "label": "Light Blue"},
    { "color": "bg-danger", "label": "Red"},
    { "color": "bg-warning", "label": "Yellow"},
    { "color": "bg-dark-dark", "label": "Dark"}
  ];

  constructor(
    private common: CommonService,
    private dialog: MatDialog,
    private cmsService: CmsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getData();

    this.form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.formSkill = this.formBuilder.group({
      id: [''],
      category: ['', Validators.required],
      title: ['', Validators.required],
      count: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  getData() {
    this.cmss = [];
    this.skills = [];

    this.cmsService.getAllCms().subscribe(data => {
      if (data.length > 0) {
        this.cmss = data;
        this.dataSource = new MatTableDataSource(this.cmss);
      }
    });

    this.cmsService.getAllSkill().subscribe(data => {
      if (data.length > 0) {
        this.skills = data;
        this.dataSourceSkill = new MatTableDataSource(this.skills);
      }
    });
  }

  submit(type: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.title,
        content: (type == "cms") ? this.subTitle : this.subTitleSkill
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (type == "cms") {
        if (result && this.update) {
          this.updateForm(type);
        } 
        
        if(result && !this.update ){
          this.addForm(type);
        }
      } else {
        if (result && this.updateSkill) {
          this.updateForm(type);
        }

        if (result && !this.updateSkill) {
          this.addForm(type);
        }
      }
    });
  }

  addForm(type) {
    if (type == "cms") {
      this.cmsService.addCms(this.form.value).subscribe(data => {
        if (data == "taken") {
          this.common.openSnackBar("Content title has been taken!  Choose another title!");
        } else if (data) {
          this.common.openSnackBar("New content has been added!");
          this.getData();
          this.clearForm('cms');
        } else {
          this.common.openSnackBar("Failed to add new content!");
        }
      }); 
    } else {
      this.cmsService.addSkill(this.formSkill.value).subscribe(data => {
        if (data == "taken") {
          this.common.openSnackBar("SKill already exist!  Might want to update it!");
        } else if (data) {
          this.common.openSnackBar("New Skill registered!");
          this.getData();
          this.clearForm('skill');
        } else {
          this.common.openSnackBar("Failed to register skill!");
        }
      });
    }
  }

  updateForm(type) {
    if (type == "cms") {
      this.cmsService.updateCms(this.form.value).subscribe(data => {
        if (data) {
          this.common.openSnackBar("Content information has been updated!");
          this.getData();
          this.clearForm('cms');
        } else {
          this.common.openSnackBar("Failed to update content information!");
        }
      });
    } else {
      this.cmsService.updateSkill(this.formSkill.value).subscribe(data => {
        if (data) {
          this.common.openSnackBar("Skill has been updated!");
          this.getData();
          this.clearForm('skill');
        } else {
          this.common.openSnackBar("Failed to update skill!");
        }
      });
    }
  }

  initUpdate(id: number, category: string, title: string, details: string, count: number, color: string, type: string) {
    if (type == "cms") {
      this.update = true;
      this.subTitle = "Content information will be updated!";
      this.form.patchValue({
        id: id,
        title: title,
        details: details
      });
    } else {
      this.updateSkill = true;
      this.subTitleSkill = "Skill information will be updated!";
      this.formSkill.patchValue({
        id: id,
        category: category,
        title: title,
        count: count,
        color: color
      });
    }
  }

  clearForm(type: string) {
    if (type == "cms") {
      this.form.reset();
      this.update = false;
      this.subTitle = "New content will be added!"; 
    } else {
      this.formSkill.reset();
      this.updateSkill = false;
      this.subTitleSkill = "New skill will be registered!";
    }
  }

  delete(id: number, type: string) {
    let delSubTitle: string = "Content will be deleted! <br> NOT REVERSABLE!";
    if (type == "skill") {
      delSubTitle = "SKill will be deleted! <br> NOT REVERSABLE!";
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Are you sure?",
        content: delSubTitle
      },
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (type == "cms") {
          this.cmsService.deleteCms(id).subscribe(data => {
            if (data) {
              this.common.openSnackBar("Content has been deleted!");
              this.getData();
            }
          });
        } else {
          this.cmsService.deleteSkill(id).subscribe(data => {
            if (data) {
              this.common.openSnackBar("Skill has been deleted!");
              this.getData();
            }
          });
        }
      }
    });
  }
}
