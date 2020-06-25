import { Injectable } from '@angular/core';
import { Global } from '../global.';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { projects, projectDetail } from '../service-interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private global: Global,
    private http: HttpClient
  ) { }

  // Get all projects
  getProjects(): Observable<projects[]> {
    return this.http.get<projects[]>(this.global.url + "getProjects");
  }

  // Get last inserted project
  getLatestProject(): Observable<projects> {
    return this.http.get<projects>(this.global.url + "getLatestProject");
  }

  // Get one poject
  getOneProject(project_id: number): Observable<projects> {
    return this.http.get<projects>(this.global.url + "getOneProject/" + project_id);
  }

  // Add project
  addProject(data: projects): Observable<any> {
    return this.http.post<any>(this.global.url + "addProject", data);
  }

  // Update project
  updateProject(data: projects): Observable<any> {
    return this.http.put<any>(this.global.url + "updateProject", data);
  }

  // Soft delete a project
  deleteProject(project_id: number): Observable<any> {
    return this.http.get<any>(this.global.url + "deleteProject/" + project_id);
  }

  // Get soft deleted projects
  getTrashedProjects(): Observable<projects[]> {
    return this.http.get<projects[]>(this.global.url + "getTrashedProjects");
  }

  /*---------------------------------------*/

  // Add project details
  addProjectDetail(projectDetail: projectDetail): Observable<any> {
    return this.http.post<any>(this.global.url + "addProjectDetail", projectDetail);
  }

  // Get project details
  getProjectDetails(project_id: number): Observable<projectDetail[]> {
    return this.http.get<projectDetail[]>(this.global.url + "getProjectDetails/" + project_id);
  }

  // Update project detail
  updateProjectDetail(projectDetail: projectDetail): Observable<any> {
    return this.http.put<any>(this.global.url + "updateProjectDetail", projectDetail);
  }

  // Delete project detail
  deleteProjectDetail(id: number): Observable<any> {
    return this.http.get<any>(this.global.url + "deleteProjectDetail/" + id);
  }
}
