import { Component, OnInit } from '@angular/core';
import { AdressService } from '@app/services/adress.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form = {
    adress: '',
    city: '',
    postcode: '',
  };
  isLoading = false;
  constructor(private adressService: AdressService) {}

  ngOnInit(): void {}

  findAdress() {
    this.adressService.search(this.form.adress, this.form.postcode).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
