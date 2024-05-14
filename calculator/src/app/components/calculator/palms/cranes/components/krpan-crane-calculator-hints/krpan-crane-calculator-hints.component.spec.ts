import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsCraneCalculatorHintsComponent } from './krpan-crane-calculator-hints.component';

describe('PalmsCraneCalculatorHintsComponent', () => {
  let component: PalmsCraneCalculatorHintsComponent;
  let fixture: ComponentFixture<PalmsCraneCalculatorHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsCraneCalculatorHintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsCraneCalculatorHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
