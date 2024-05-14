import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsCraneInformationComponent } from './krpan-crane-information.component';

describe('PalmsCraneInformationComponent', () => {
  let component: PalmsCraneInformationComponent;
  let fixture: ComponentFixture<PalmsCraneInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsCraneInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsCraneInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
