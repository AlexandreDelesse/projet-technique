import { TestBed } from '@angular/core/testing';

import { AddApiKeyInterceptor } from './add-api-key.interceptor';

describe('AddApiKeyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddApiKeyInterceptor
      ]
  }));

  /*it('should be created', () => {
    const interceptor: AddApiKeyInterceptor = TestBed.inject(AddApiKeyInterceptor);
    expect(interceptor).toBeTruthy();
  });*/
});
