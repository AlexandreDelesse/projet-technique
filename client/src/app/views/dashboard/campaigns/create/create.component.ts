import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdressService } from '@app/services/adress.service';
import { FileUploadService } from '@app/services/file-upload.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  isLoading = false;
  campaign: any = {
    title: '',
    description: '',
    slot_duration: '',
    start_date: new Date(),
    end_date: new Date(),
    start_time: new Date(0, 0, 0, 8, 0),
    end_time: new Date(0, 0, 0, 17, 0),
    adress: { properties: {} },
    file: {},
  };
  showSuccessAlert = false;
  showErrorAlert = false;
  errors: any = {};

  constructor(
    private campaignService: CampaignService,
    private adressService: AdressService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap((searchText) =>
        searchText.length > 2 ? this.adressService.search(searchText) : []
      )
    );
  };

  formatter(value: any) {
    return value.properties.label;
  }

  onChange(e: any) {
    this.campaign.file = e.target.files[0];
  }

  onSubmit(): void {
    var formData: FormData = new FormData();
    formData.append('file', this.campaign.file);
    this.isLoading = true;
    let data = {
      ...this.campaign,
      adress: this.campaign.adress.properties,
      start_date: moment(this.campaign.start_date).format('YYYY-MM-DD'),
      end_date: moment(this.campaign.end_date).format('YYYY-MM-DD'),
      start_time:
        ('0' + this.campaign.start_time.getHours()).slice(-2) +
        ':' +
        ('0' + this.campaign.start_time.getMinutes()).slice(-2),
      end_time:
        ('0' + this.campaign.end_time.getHours()).slice(-2) +
        ':' +
        ('0' + this.campaign.end_time.getMinutes()).slice(-2),
    };

    this.fileUploadService.upload(formData).subscribe(
      (file) => {
        this.campaignService
          .addCampaign({
            ...data,
            file_id: file.id,
          })
          .subscribe(
            (data) => {
              this.showSuccessAlert = true;
              setTimeout(() => {
                this.showSuccessAlert = false;
              }, 5000);
              this.isLoading = false;
            },
            (error) => {
              if (error.status == 422) {
                this.errors = error.error.errors;
              }
              console.log(this.errors);
              this.showErrorAlert = true;
              setTimeout(() => {
                this.showErrorAlert = false;
              }, 5000);
              this.isLoading = false;
            }
          );
      },
      (error) => {
        if (error.status == 422) {
          this.errors = error.error.errors;
        }
        this.isLoading = false;
      }
    );
  }
}
