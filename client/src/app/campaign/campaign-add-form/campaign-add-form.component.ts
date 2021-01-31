import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-add-form',
  templateUrl: './campaign-add-form.component.html',
  styleUrls: ['./campaign-add-form.component.scss']
})
export class CampaignAddFormComponent implements OnInit {

  addCampaignForm = this.formBuilder.group({
    capacity: ['', Validators.required],
    createdAt: [''],
    endAt: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    startAt: ['', Validators.required],
    title: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
  }

  onSubmitCampaignForm(): void {
    // TODO create function to send data with POST
  }

  onBackBtn(): void {
    // TODO use navigation to go back to menu
  }

}
