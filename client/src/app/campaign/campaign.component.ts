import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../service/campaign.service';
import {Campaign} from '../models/Campaign';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  campaigns?: Campaign[];
  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.campaignService.getCampaigns().subscribe(
      (data) => {
        this.campaigns = data;
        console.log(this.campaigns);
      },
    (error) => {
        console.log(error);
    });
  }

}
