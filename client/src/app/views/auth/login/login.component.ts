import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { LoginService } from '@app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  isLoading: boolean = false;
  errors: any = {
    email: [],
    password: [],
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.isLoading = true;
    return this.loginService.login(this.credentials).subscribe(
      ({ body }) => {
        this.isLoading = false;
        let userStr = JSON.stringify(body.user);
        let user = new User();
        localStorage.setItem('apiKey', body.key);
        localStorage.setItem('user', userStr);
        Object.assign(user, JSON.parse(userStr));
        this.loginService.updateCurrentUser(user);
        this.router.navigate(['/']);
      },
      ({ error }) => {
        this.errors = error.errors;
        this.isLoading = false;
      }
    );
  }
}
