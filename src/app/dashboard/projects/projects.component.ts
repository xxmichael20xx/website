import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { projects } from 'src/app/service-interface';
import { ViewProjectComponent } from 'src/app/element/view-project/view-project.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { TrashedProjectsComponent } from '../trashed-projects/trashed-projects.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: projects[] = [];

  constructor(
    private common: CommonService,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projects = [];

    this.projectService.getProjects().subscribe(data => {
      if (data.length > 0) {
        this.projects = data;
      }
    });
  }

  newProjectDialog() {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: {
        type: "add"
      },
      width: "45%",
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status == "updated" || result.status == "added") {
        this.getProjects();
        this.common.openSnackBar(result.title);
      }
    });
  }

  viewTrashed() {
    const dialogRef = this.dialog.open(TrashedProjectsComponent, {
      width: "50%"
    });
  }

  viewProject(project_id: number) {
    const dialogRef = this.dialog.open(ViewProjectComponent, {
      data: {
        project_id
      },
      width: "45%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.status == "deleted") {
          this.getProjects();
          this.common.openSnackBar(result.title);
        }
      }
    });
  }

}
