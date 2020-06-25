import { Injectable } from '@angular/core';
import { Global } from '../global.';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface login {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private global: Global,
    private http: HttpClient
  ) { }

  login(data: login): Observable<boolean> {
    return this.http.post<boolean>(this.global.url + "login", data);
  }

  log(): Observable<any> {
    return this.http.get<any>(this.global.url + "log");
  }
}
