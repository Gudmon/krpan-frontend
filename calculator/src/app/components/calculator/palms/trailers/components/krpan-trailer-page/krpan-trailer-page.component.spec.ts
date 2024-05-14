import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanTrailerPageComponent } from './krpan-trailer-page.component';

describe('PalmsTrailerPageComponent', () => {
  let component: KrpanTrailerPageComponent;
  let fixture: ComponentFixture<KrpanTrailerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanTrailerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanTrailerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
