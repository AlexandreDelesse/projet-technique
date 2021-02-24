import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddApiKeyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      request = request.clone({
        headers: new HttpHeaders({
          apiKey: apiKey,
        }),
      });
    }
    return next.handle(request);
  }
}
