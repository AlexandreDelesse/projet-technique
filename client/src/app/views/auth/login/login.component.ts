import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
        localStorage.setItem('apiKey', body.key);
        localStorage.setItem('user', JSON.stringify(body.user));
        this.router.navigate(['/']);
      },
      ({ error }) => {
        this.errors = error.errors;
        this.isLoading = false;
      }
    );
  }
}
