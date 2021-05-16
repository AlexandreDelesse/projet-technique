import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdressService } from '@app/services/adress.service';
import { LoginService } from '@app/services/login/login.service';
import { OauthService } from '@app/services/oauth.service';
import { UserService } from '@app/services/user.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  adress: any;
  isLoading = false;
  user: any;
  showSuccessAlert = false;
  showErrorAlert = false;
  successMessage = '';
  form1Loading = false;

  constructor(
    private adressService: AdressService,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;
    });
    this.adress = {
      properties: this.user.adress,
    };
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap((searchText) =>
        searchText.length > 2 ? this.adressService.search(searchText) : []
      )
    );
  };

  formatter(value: any) {
    return value.properties.label;
  }

  changeAdress() {
    this.isLoading = true;
    console.log(this.adress);
    this.userService
      .updateAdress(this.adress.properties, this.user.id)
      .subscribe(
        (user) => {
          this.loginService.updateCurrentUser(user);
          this.isLoading = false;
          this.successMessage = 'Succès!';
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 5000);
        },
        (error) => {
          this.showErrorAlert = true;
          setTimeout(() => {
            this.showErrorAlert = false;
          }, 5000);
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  changePersonalInfo() {
    this.form1Loading = true;
    if (this.user.birthdate) {
      this.user.birthdate = moment(this.user.birthdate).format('YYYY-MM-DD');
    }
    // Remove empty propreties
    Object.keys(this.user).forEach(
      (key) => this.user[key] == null && delete this.user[key]
    );
    this.userService.update(this.user.id, this.user).subscribe(
      (user) => {
        this.form1Loading = false;
        this.successMessage = 'Votre profile a ètè bien modifié.';
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 5000);
        this.loginService.updateCurrentUser(user);
      },
      (error) => {
        this.form1Loading = false;
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 5000);
      }
    );
  }
}
