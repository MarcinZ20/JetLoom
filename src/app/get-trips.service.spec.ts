import { TestBed } from '@angular/core/testing';

import { GetTripsService } from './get-trips.service';

describe('GetTripsService', () => {
  let service: GetTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
