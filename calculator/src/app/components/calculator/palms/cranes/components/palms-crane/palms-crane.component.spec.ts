import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsCraneComponent } from './palms-crane.component';

describe('PalmsCraneComponent', () => {
  let component: PalmsCraneComponent;
  let fixture: ComponentFixture<PalmsCraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsCraneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsCraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
