import { Injectable } from '@angular/core';
import { Global } from '../global.';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { log } from '../service-interface';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private global: Global,
    private http: HttpClient
  ) { }

  log(): Observable<any> {
    return this.http.get<any>(this.global.url + "log");
  }

  getLogs(): Observable<log[]> {
    return this.http.get<log[]>(this.global.url + "getLogs");
  }
}
