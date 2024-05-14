import { TestBed } from '@angular/core/testing';

import { KrpanTrailerConfigService } from './krpan-trailer-config.service';

describe('PalmsTrailerConfigService', () => {
  let service: KrpanTrailerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KrpanTrailerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
