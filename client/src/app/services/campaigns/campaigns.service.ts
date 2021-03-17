import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '@app/models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  baseUrl = 'http://127.0.0.1:8000/api/campaigns';
  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.baseUrl);
  }

  addCampaign(campaign: any): Observable<Campaign> {
    return this.http.post<Campaign>(this.baseUrl, campaign);
  }

  deleteCampain(campaign: Campaign): Observable<any> {
    return this.http.delete<Campaign>(this.baseUrl + '/' + campaign.id);
  }
}
