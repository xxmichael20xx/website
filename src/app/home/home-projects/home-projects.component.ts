import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { homeProject } from 'src/app/service-interface';

@Component({
  selector: 'app-home-projects',
  templateUrl: './home-projects.component.html',
  styleUrls: ['./home-projects.component.scss']
})
export class HomeProjectsComponent implements OnInit {

  public projects: homeProject[] = [];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      if (data.length > 0) {
        data.forEach((element, index) => {
          let project_id = element.id;
          let temp: homeProject = {
            title: element.title,
            description: element.description,
            created_at: element.created_at,
            fronts: [],
            backs: []
          };

          this.projectService.getProjectDetails(project_id).subscribe(detailsData => {
            if (detailsData.length > 0) {
              detailsData.forEach((elementData, index) => {
                if (elementData.category == "Front-End") {
                  temp.fronts.push(elementData);
                } else {
                  temp.backs.push(elementData);
                }

                if (index + 1 == detailsData.length) {

                  this.projects.push(temp);
                }
              });
            }
          });

          if (index + 1 == data.length) {
            console.log(this.projects);
          }
        });
      }
    });
  }

}
