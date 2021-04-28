import { Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { Campaign } from '@app/models/campaign';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit, OnDestroy {
  campaigns?: Campaign[];
  routeSubscription: any;
  isLoading = false;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  faMapMarkerAlt = faMapMarkerAlt;
  faCalendar = faCalendar;

  ngOnInit(): void {
    this.getCampaigns();
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
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
    this.isLoading = true;
    this.campaignService.getCampaigns(params).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.campaigns = data;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}
