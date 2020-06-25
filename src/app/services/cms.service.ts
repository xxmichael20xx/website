import { Injectable } from '@angular/core';
import { Global } from '../global.';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cms, skill } from '../service-interface';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(
    private global: Global,
    private http: HttpClient
  ) { }

  getAllCms(): Observable<cms[]> {
    return this.http.get<cms[]>(this.global.url + "getAllCms");
  }

  getOneCms(id: number): Observable<cms> {
    return this.http.get<cms>(this.global.url + "getOneCms/" + id);
  }

  getCmsByTitle(title: string): Observable<cms> {
    return this.http.get<cms>(this.global.url + "getCmsByTitle/" + title);
  }

  checkTitle(title: string): Observable<cms> {
    return this.http.get<cms>(this.global.url + "checkTitle/" + title);
  }

  addCms(cms: cms): Observable<any> {
    return this.http.post<any>(this.global.url + "addCms", cms);
  }

  updateCms(cms: cms): Observable<any> {
    return this.http.put<any>(this.global.url + "updateCms", cms);
  }

  deleteCms(id: number): Observable<any> {
    return this.http.get<any>(this.global.url + "deleteCms/" + id);
  }

  /*---------------------------------------*/

  getAllSkill(): Observable<skill[]> {
    return this.http.get<skill[]>(this.global.url + "getAllSkill");
  }

  getCategorySkill(category: string): Observable<skill[]> {
    return this.http.get<skill[]>(this.global.url + "getCategorySkill/" + category);
  }

  checkSkill(title: string): Observable<skill> {
    return this.http.get<skill>(this.global.url + "checkSkill/" + title);
  }

  addSkill(skill: skill): Observable<any> {
    return this.http.post<any>(this.global.url + "addSkill", skill);
  }

  updateSkill(skill: skill): Observable<any> {
    return this.http.put<any>(this.global.url + "updateSkill", skill);
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.get<any>(this.global.url + "deleteSkill/" + id);
  }
}
