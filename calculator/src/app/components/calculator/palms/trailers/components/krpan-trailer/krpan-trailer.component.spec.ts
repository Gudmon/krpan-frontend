import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanTrailerComponent } from './krpan-trailer.component';

describe('PalmsTrailerComponent', () => {
  let component: KrpanTrailerComponent;
  let fixture: ComponentFixture<KrpanTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanTrailerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
