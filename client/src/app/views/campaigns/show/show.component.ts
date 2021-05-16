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
    bloodgroup_id: '',
    date: new Date(),
  };
  user: any;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendar = faCalendar;
  alreadyBooked = false;
  showSuccessAlert = false;
  showErrorAlert = false;

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
      this.alreadyBooked =
        this.user.campaigns.findIndex(
          (item: { id: number | undefined }) => item.id == this.campaign?.id
        ) != -1;
    });
  }

  onSubmit() {
    this.form.date = moment(this.form.date).format('YYYY-MM-DD hh:mm:ss');
    this.appointmentsService.store(this.campaign?.slug, this.form).subscribe(
      () => {
        this.alreadyBooked = true;
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 5000);
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
