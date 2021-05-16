import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '@app/models/campaign';
import { AdressService } from '@app/services/adress.service';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  city: any;
  start_at = new Date();
  end_at = moment().add(7, 'days').toDate();
  campaigns?: Campaign[];
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendar = faCalendar;

  constructor(
    private adressService: AdressService,
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    let params: any = {};
    if (this.route.snapshot.queryParamMap.get('city')) {
      params.city = this.route.snapshot.queryParamMap.get('city');
    }
    if (this.route.snapshot.queryParamMap.get('start_at')) {
      params.start_at = this.route.snapshot.queryParamMap.get('start_at');
    }
    if (this.route.snapshot.queryParamMap.get('end_at')) {
      params.end_at = this.route.snapshot.queryParamMap.get('end_at');
    }
    this.campaignService.getCampaigns(params).subscribe(
      (data) => {
        this.campaigns = data;
      },
      (error) => {}
    );
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap((searchText) =>
        searchText.length >= 2 ? this.adressService.searchCity(searchText) : []
      )
    );
  };

  formatter(value: any) {
    return value.nom;
  }

  onSubmit() {
    let params: any = {
      start_at: moment(this.start_at).format('YYYY-MM-DD'),
      end_at: moment(this.end_at).format('YYYY-MM-DD'),
    };
    if (this.city) {
      params.city = this.city;
    }
    this.router.navigate(['/campaigns'], {
      queryParams: params,
    });
  }
}
