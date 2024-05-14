import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanTrailerCalculatorHintsComponent } from './krpan-trailer-calculator-hints.component';

describe('PalmsTrailerCalculatorHintsComponent', () => {
  let component: KrpanTrailerCalculatorHintsComponent;
  let fixture: ComponentFixture<KrpanTrailerCalculatorHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanTrailerCalculatorHintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanTrailerCalculatorHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
