import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointementService {
  private baseUrl = 'http://127.0.0.1:8000/api/campaigns';
  constructor(private http: HttpClient) {}

  store(slug: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${slug}/appointements`, data);
  }
}
