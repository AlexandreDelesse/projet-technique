import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdressService {
  apiUrl = 'https://api-adresse.data.gouv.fr/search/';
  private http: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  search(query: string, postcode?: any): Observable<any> {
    let params = {
      autocomplete: '1',
      query,
    };
    if (postcode) {
      params.query = query;
    }
    return this.http.get(this.apiUrl, {
      params,
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': '*',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }
}
