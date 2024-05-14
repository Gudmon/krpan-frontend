import { TestBed } from '@angular/core/testing';

import { PalmsTrailerConfigService } from './palms-trailer-config.service';

describe('PalmsTrailerConfigService', () => {
  let service: PalmsTrailerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalmsTrailerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
