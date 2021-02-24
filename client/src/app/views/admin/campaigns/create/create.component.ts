import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Campaign } from '@app/models/campaign';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  addCampaignForm = this.formBuilder.group({
    capacity: ['', Validators.required],
    end_at: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    start_at: ['', Validators.required],
    title: ['', Validators.required],
  });
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  onSubmitCampaignForm(): void {
    this.isLoading = true;
    const campaign = new Campaign(
      this.addCampaignForm.value.title,
      this.addCampaignForm.value.description,
      this.addCampaignForm.value.location,
      this.addCampaignForm.value.start_at,
      this.addCampaignForm.value.end_at,
      this.addCampaignForm.value.capacity,
      this.datePipe.transform(Date(), 'mediumDate')
    );

    this.campaignService.addCampaign(campaign).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
        this.addCampaignForm.reset();
      }
    );
  }
}
