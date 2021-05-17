import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { LoginService } from '@app/services/login/login.service';
// test
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  isLoading: boolean = false;
  errors: any = {
    firstname: [],
    lastname: [],
    email: [],
    password: [],
    password_confirmation: [],
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.isLoading = true;
    this.loginService.register(this.user).subscribe(
      ({ body }) => {
        localStorage.setItem('apiKey', body.key);
        this.isLoading = false;
        this.router.navigate(['/']);
        this.loginService.updateCurrentUser(body.user);
      },
      ({ error }) => {
        this.errors = error.errors;
        this.isLoading = false;
      }
    );
  }
}
