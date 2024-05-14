import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanTrailerOverviewHintsComponent } from './krpan-trailer-overview-hints.component';

describe('PalmsTrailerOverviewHintsComponent', () => {
  let component: KrpanTrailerOverviewHintsComponent;
  let fixture: ComponentFixture<KrpanTrailerOverviewHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanTrailerOverviewHintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanTrailerOverviewHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
