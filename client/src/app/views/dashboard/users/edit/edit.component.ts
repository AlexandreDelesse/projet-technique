import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  user: any;
  isLoading = false;
  showErrorAlert = false;
  showSuccessAlert = false;
  successMessage = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser() {
    this.isLoading = true;
    if (this.user.birthdate) {
      this.user.birthdate = moment(this.user.birthdate).format('YYYY-MM-DD');
    }
    Object.keys(this.user).forEach(
      (key) => this.user[key] == null && delete this.user[key]
    );
    this.userService.update(this.user.id, this.user).subscribe(
      (response) => {
        this.isLoading = false;
        this.successMessage = "L'utilisateur a ètè bien modifié.";
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 5000);
      },
      (error) => {
        this.isLoading = false;
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 5000);
      }
    );
  }
}
