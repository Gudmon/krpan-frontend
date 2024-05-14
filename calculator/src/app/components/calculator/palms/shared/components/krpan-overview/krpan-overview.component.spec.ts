import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanOverviewComponent } from './krpan-overview.component';

describe('PalmsOverviewComponent', () => {
  let component: KrpanOverviewComponent;
  let fixture: ComponentFixture<KrpanOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
