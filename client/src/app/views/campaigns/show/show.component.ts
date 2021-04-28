import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from '@app/models/campaign';
import { CampaignService } from '@app/services/campaigns/campaigns.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  campaign: Campaign | undefined;
  isLoading = true;
  form: any = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    blood: '',
    date: new Date(),
  };
  constructor(
    private campaignsService: CampaignService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.campaignsService.getCampaign(slug).subscribe(
        (campaign) => {
          this.campaign = campaign;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }
  }
}
