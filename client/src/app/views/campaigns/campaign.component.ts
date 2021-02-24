import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { Campaign } from '@app/models/campaign';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  campaigns?: Campaign[];
  constructor(private campaignService: CampaignService) {}

  faMapMarkerAlt = faMapMarkerAlt;
  faCalendar = faCalendar;

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(
      (data) => {
        this.campaigns = data;
        console.log(this.campaigns);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteCampaign(campaign: Campaign): void {
    this.campaignService.deleteCampain(campaign).subscribe(
      (data) => {
        this.getCampaigns();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
