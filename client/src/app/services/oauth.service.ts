import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  private baseUrl = 'http://127.0.0.1:8000/api/google-calendar';
  constructor(private http: HttpClient) {}

  getGCAuthUrl(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth-url`);
  }

  oauth2callback(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/oauth2callback`, {
      params: {
        code,
      },
    });
  }
}
