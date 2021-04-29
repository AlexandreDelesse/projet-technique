import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdressService {
  apiUrl = 'https://api-adresse.data.gouv.fr/search/';

  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  search(query: string): Observable<any> {
    return this.http
      .get(this.apiUrl, {
        params: {
          q: query,
          limit: '10',
        },
      })
      .pipe(
        map((response: any) => {
          return response.features.filter(
            (item: any) => item.properties.type == 'housenumber'
          );
        })
      );
  }

  searchCity(name: string): Observable<any> {
    return this.http
      .get('https://geo.api.gouv.fr/communes', {
        params: {
          nom: name,
          bootst: 'population',
          limit: '10',
        },
      })
      .pipe(
        map((response: any) => {
          return response.sort(
            (item1: any, item2: any) => item2.population - item1.population
          );
        })
      );
  }
}
