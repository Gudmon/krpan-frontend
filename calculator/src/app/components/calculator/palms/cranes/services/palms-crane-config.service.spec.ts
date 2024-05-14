import { TestBed } from '@angular/core/testing';

import { PalmsCraneConfigService } from './palms-crane-config.service';

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
