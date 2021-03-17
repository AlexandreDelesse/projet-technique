import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdressService } from '@app/services/adress.service';
import { FileUploadService } from '@app/services/file-upload.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  isLoading = false;
  campaign = {
    title: '',
    description: '',
    capacity: '',
  };
  start_at = new Date();
  end_at = new Date();
  adress: any;
  file: any;

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
    this.file = e.target.files[0];
  }

  onSubmit(): void {
    var formData: FormData = new FormData();
    formData.append('file', this.file);
    this.isLoading = true;

    this.fileUploadService.upload(formData).subscribe(
      (file) => {
        this.campaignService
          .addCampaign({
            ...this.campaign,
            adress: this.adress.properties,
            file_id: file.id,
            start_at: moment(this.start_at).format('YYYY-MM-DD hh:mm:ss'),
            end_at: moment(this.end_at).format('YYYY-MM-DD hh:mm:ss'),
          })
          .subscribe(
            (data) => {
              console.log(data);
              this.isLoading = false;
            },
            (error) => {
              console.log(error);
              this.isLoading = false;
            }
          );
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
