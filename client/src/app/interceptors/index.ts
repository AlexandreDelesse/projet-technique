/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnauthenticatedInterceptor } from './unauthenticated.interceptor';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';

import { AddApiKeyInterceptor } from './add-api-key.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AddApiKeyInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthenticatedInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthorizedInterceptor,
    multi: true,
  },
];
