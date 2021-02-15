import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Campaign } from '../../models/Campaign';
import { CampaignService } from '../../services/campaigns/campaigns.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-campaign-add-form',
  templateUrl: './campaign-add-form.component.html',
  styleUrls: ['./campaign-add-form.component.scss'],
})
export class CampaignAddFormComponent implements OnInit {
  addCampaignForm = this.formBuilder.group({
    capacity: ['', Validators.required],
    createdAt: [''],
    endAt: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    startAt: ['', Validators.required],
    title: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  onSubmitCampaignForm(): void {
    const campaign = new Campaign(
      this.addCampaignForm.value.title,
      this.addCampaignForm.value.description,
      this.addCampaignForm.value.location,
      this.addCampaignForm.value.startAt,
      this.addCampaignForm.value.endAt,
      this.addCampaignForm.value.capacity,
      this.datePipe.transform(Date(), 'mediumDate')
    );

    this.campaignService.addCampaign(campaign).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.addCampaignForm.reset();
  }

  onBackBtn(): void {
    // TODO use navigation to go back to menu
  }
}
