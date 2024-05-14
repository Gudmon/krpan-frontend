import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanTrailersComponent } from './krpan-trailers.component';

describe('PalmsTrailersComponent', () => {
  let component: KrpanTrailersComponent;
  let fixture: ComponentFixture<KrpanTrailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanTrailersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanTrailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
