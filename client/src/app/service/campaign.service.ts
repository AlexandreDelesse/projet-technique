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
}
