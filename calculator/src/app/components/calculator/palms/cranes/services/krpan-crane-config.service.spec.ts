import { TestBed } from '@angular/core/testing';

import { PalmsCraneConfigService } from './krpan-crane-config.service';

describe('PalmsCraneConfigService', () => {
  let service: PalmsCraneConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalmsCraneConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
