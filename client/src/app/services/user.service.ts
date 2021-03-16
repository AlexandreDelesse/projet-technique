import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  update(id: number, data: any): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${id}`, data, {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    });
  }

  updateAdress(adress: any, id: number): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${id}/adress`, adress, {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    });
  }
}
