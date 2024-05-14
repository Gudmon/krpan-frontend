import { TestBed } from '@angular/core/testing';

import { PalmsService } from './krpan.service';

describe('PalmsTrailersService', () => {
  let service: PalmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
