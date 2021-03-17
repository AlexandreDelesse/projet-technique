import { Component, OnInit } from '@angular/core';
import { AdressService } from '@app/services/adress.service';
import { LoginService } from '@app/services/login/login.service';
import { UserService } from '@app/services/user.service';
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

  constructor(
    private adressService: AdressService,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;
    });
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

  onSubmit() {
    this.isLoading = true;
    console.log(this.adress);
    this.userService
      .updateAdress(this.adress.properties, this.user.id)
      .subscribe(
        (user) => {
          let userStr = JSON.stringify(user);
          localStorage.setItem('user', userStr);
          this.user = user;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }
}
