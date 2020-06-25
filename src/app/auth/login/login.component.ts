import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private common: CommonService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.userService.login(this.form.value).subscribe(data => {
      if (data == null) {
        this.common.openSnackBar("Account not Found!");
      } else {
        sessionStorage.setItem("isLogged_in", "true");
        sessionStorage.setItem("email", this.form.get("email").value);

        this.router.navigateByUrl('dashboard');
      }
    });
  }
}
