import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsTrailerCalculatorHintsComponent } from './palms-trailer-calculator-hints.component';

describe('PalmsTrailerCalculatorHintsComponent', () => {
  let component: PalmsTrailerCalculatorHintsComponent;
  let fixture: ComponentFixture<PalmsTrailerCalculatorHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsTrailerCalculatorHintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsTrailerCalculatorHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
