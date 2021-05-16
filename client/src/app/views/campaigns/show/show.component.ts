import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from '@app/models/campaign';
import { AppointementService } from '@app/services/appointement.service';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { LoginService } from '@app/services/login/login.service';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  campaign: Campaign | undefined;
  isLoading = true;
  form: any = {
    bloodgroup_id: null,
    slot: null,
  };
  user: any;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendar = faCalendar;
  alreadyBooked = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  slots: Date[] = [];

  constructor(
    private campaignsService: CampaignService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private appointmentsService: AppointementService
  ) {}

  ngOnInit(): void {
    let slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.campaignsService.getCampaign(slug).subscribe(
        (campaign) => {
          this.campaign = campaign;
          this.isLoading = false;
          this.calculateSlots();
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;
      this.form.bloodgroup_id = this.user.bloodgroup_id;
      if (this.user.campaigns) {
        this.alreadyBooked =
          this.user.campaigns.findIndex(
            (item: { id: number | undefined }) => item.id == this.campaign?.id
          ) != -1;
      }
    });
  }

  calculateSlots() {
    if (this.campaign) {
      let start_time: Time = {
        hours: Number(this.campaign.start_time.split(':')[0]),
        minutes: Number(this.campaign.start_time.split(':')[1]),
      };

      let end_time = {
        hours: Number(this.campaign.end_time.split(':')[0]),
        minutes: Number(this.campaign.end_time.split(':')[1]),
      };

      let i = moment(this.campaign.start_date);
      i.hour(start_time.hours);
      i.minute(start_time.minutes);

      let endDate = moment(this.campaign.end_date);
      endDate.hour(end_time.hours);
      endDate.minute(end_time.minutes);

      while (i < endDate) {
        this.slots.push(i.toDate());
        i.add(this.campaign.slot_duration, 'minutes');
        if (i.hours() > end_time.hours && i.minutes() > end_time.minutes) {
          i.add(1, 'days');
          i.hour(start_time.hours);
          i.minute(start_time.minutes);
        }
      }
    }
  }

  onSubmit() {
    this.form.date = moment(this.form.date).format('YYYY-MM-DD hh:mm');
    this.appointmentsService.store(this.campaign?.slug, this.form).subscribe(
      () => {
        this.alreadyBooked = true;
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 5000);
        if (this.form.bloodgroup_id != null) {
          this.user.bloodgroup_id = this.form.bloodgroup_id;
          this.loginService.updateCurrentUser(this.user);
        }
      },
      (error) => {
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 5000);
        console.log(error);
      }
    );
  }
}
