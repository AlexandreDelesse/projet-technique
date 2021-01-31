import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Campaign} from '../models/Campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  url = 'http://localhost:3000/campaign';
  constructor(private http: HttpClient) { }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.url);
  }
  addCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.url, campaign);
  }
  deleteCampain(campaign: Campaign): Observable<any>{
    return this.http.delete<Campaign>(this.url + '/' + campaign.id);
  }
}
