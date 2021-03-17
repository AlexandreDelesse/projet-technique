import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Campaign } from '@app/models/campaign';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { DatePipe, formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdressService } from '@app/services/adress.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  isLoading = false;
  campaign = {
    title: '',
    description: '',
    capacity: '',
    start_at: '',
    end_at: '',
  };
  adress: any;

  constructor(
    private campaignService: CampaignService,
    private datePipe: DatePipe,
    private adressService: AdressService
  ) {}

  ngOnInit(): void {}

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

  onSubmit(): void {
    this.isLoading = true;
    console.log(this.campaign);
    // this.campaignService
    //   .addCampaign({
    //     ...this.campaign,
    //     adress: this.adress.propreties,
    //   })
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       this.isLoading = false;
    //     }
    //   );
  }
}
