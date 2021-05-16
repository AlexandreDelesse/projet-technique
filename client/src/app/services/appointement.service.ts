import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaign } from '@app/models/campaign';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointementService {
  private baseUrl = 'http://127.0.0.1:8000/api/campaigns';
  constructor(private http: HttpClient) {}

  getUserCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>('http://127.0.0.1:8000/api/appointments');
  }

  store(slug: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${slug}/appointements`, data);
  }

  cancel(campaign_id: any, user_id: any): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${campaign_id}/appointments/${user_id}`
    );
  }
}
