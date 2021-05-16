import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/services/login/login.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  isLoading = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  form: any = {
    password: '',
    password_confirmation: '',
    current_password: '',
  };
  user: any;
  errors: any = {};

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  changePassword() {
    this.isLoading = true;
    this.userService.updatePassword(this.form, this.user.id).subscribe(
      (user) => {
        this.isLoading = false;
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 5000);
      },
      (response) => {
        console.log(response);
        if (response.status == 422) {
          this.errors = response.error.errors;
        }
        this.isLoading = false;
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 5000);
      }
    );
  }
}
