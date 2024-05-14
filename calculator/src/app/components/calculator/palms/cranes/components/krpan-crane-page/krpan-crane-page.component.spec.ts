import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsCranePageComponent } from './krpan-crane-page.component';

describe('PalmsCranePageComponent', () => {
  let component: PalmsCranePageComponent;
  let fixture: ComponentFixture<PalmsCranePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsCranePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsCranePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
