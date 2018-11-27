import { TestBed } from '@angular/core/testing';

import { httpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: httpService = TestBed.get(httpService);
    expect(service).toBeTruthy();
  });
});
