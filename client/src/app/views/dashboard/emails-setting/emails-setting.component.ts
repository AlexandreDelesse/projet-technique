import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models/user';
import { LoginService } from '@app/services/login/login.service';
import { OauthService } from '@app/services/oauth.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-emails-setting',
  templateUrl: './emails-setting.component.html',
  styleUrls: ['./emails-setting.component.scss'],
})
export class EmailsSettingComponent implements OnInit {
  showSuccessAlert = false;
  showErrorAlert = false;
  user: any;
  url = '';
  googleIntegrationLoading = false;
  successMessage = '';

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private oauthService: OauthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;
    });
    let code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.googleIntegrationLoading = true;
      this.oauthService.oauth2callback(code).subscribe(
        (response) => {
          this.successMessage = 'Google calendar a été intégré.';
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 5000);
          this.googleIntegrationLoading = false;
          this.user.google_calendar_api_activated = 1;
          this.loginService.updateCurrentUser(this.user);
          this.router.navigate([]);
        },
        (error: any) => {
          console.log(error);
          this.googleIntegrationLoading = false;
          this.showErrorAlert = true;
          setTimeout(() => {
            this.showErrorAlert = false;
          }, 5000);
        }
      );
    } else {
      if (this.route.snapshot.queryParamMap.get('error')) {
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 5000);
      } else {
        this.oauthService.getGCAuthUrl().subscribe(
          (response) => {
            this.url = response.url;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    }
  }

  update() {
    this.userService
      .update(this.user.id, {
        receive_emails: !this.user.receive_emails,
      })
      .subscribe(
        (response) => {
          this.successMessage = 'Done!';
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 5000);
          this.loginService.updateCurrentUser(response);
        },
        (error) => {
          this.showErrorAlert = true;
          setTimeout(() => {
            this.showErrorAlert = false;
          }, 5000);
        }
      );
  }
}
