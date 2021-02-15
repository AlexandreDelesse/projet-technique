import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  login(credentials: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, credentials, {
      observe: 'response',
    });
  }

  register(credentials: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, credentials, {
      observe: 'response',
    });
  }

  logout() {
    // Delete consumer in kong
  }
}
