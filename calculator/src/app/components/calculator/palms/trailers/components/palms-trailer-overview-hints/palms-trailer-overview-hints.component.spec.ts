import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsTrailerOverviewHintsComponent } from './palms-trailer-overview-hints.component';

describe('PalmsTrailerOverviewHintsComponent', () => {
  let component: PalmsTrailerOverviewHintsComponent;
  let fixture: ComponentFixture<PalmsTrailerOverviewHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsTrailerOverviewHintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsTrailerOverviewHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
