import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanTrailerInformationComponent } from './krpan-trailer-information.component';

describe('PalmsTrailerInformationComponent', () => {
  let component: KrpanTrailerInformationComponent;
  let fixture: ComponentFixture<KrpanTrailerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanTrailerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanTrailerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
