import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSupportLegComponent } from './choose-support-leg.component';

describe('ChooseSupportLegComponent', () => {
  let component: ChooseSupportLegComponent;
  let fixture: ComponentFixture<ChooseSupportLegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseSupportLegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseSupportLegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
