import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public links: any[] = [
    { path: "login", label: "Login" }, { path: "signup", label: "Sign Up" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
