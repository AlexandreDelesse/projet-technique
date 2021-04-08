import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '@app/models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  baseUrl = 'http://127.0.0.1:8000/api/campaigns';
  constructor(private http: HttpClient) {}

  getCampaigns(params: any): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.baseUrl, {
      params: params,
    });
  }

  getCampaign(slug: string): Observable<Campaign> {
    return this.http.get<Campaign>(this.baseUrl + '/' + slug);
  }

  addCampaign(campaign: any): Observable<Campaign> {
    return this.http.post<Campaign>(this.baseUrl, campaign);
  }

  deleteCampain(slug: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + slug, {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    });
  }
}
