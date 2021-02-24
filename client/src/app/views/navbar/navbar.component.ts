import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { LoginService } from '@app/services/login/login.service';
import { error } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoading = true;
  user: any;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  logout(event: any) {
    event.preventDefault();
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
