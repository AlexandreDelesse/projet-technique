import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

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

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.isLoading = true;
    return this.loginService.login(this.credentials).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        // this.router.navigate(['/home']);
      },
      ({ error }) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
