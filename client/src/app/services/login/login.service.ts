import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'http://127.0.0.1:8000/api';

  private currentUserSource: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(User.getUserFromLocalStorage());
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      observe: 'response',
      headers: new HttpHeaders({
        accept: 'application/json',
        'content-type': 'application/json',
      }),
    });
  }

  register(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, {
      observe: 'response',
      headers: new HttpHeaders({
        accept: 'application/json',
        'content-type': 'application/json',
      }),
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`, {
      headers: {
        accept: 'application/json',
      },
    });
  }

  updateCurrentUser(user: User | null) {
    let userStr = JSON.stringify(user);
    localStorage.setItem('user', userStr);
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('apiKey');
    localStorage.removeItem('user');
    this.updateCurrentUser(null);
  }
}
