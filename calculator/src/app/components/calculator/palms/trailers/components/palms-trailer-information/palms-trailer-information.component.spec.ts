import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsTrailerInformationComponent } from './palms-trailer-information.component';

describe('PalmsTrailerInformationComponent', () => {
  let component: PalmsTrailerInformationComponent;
  let fixture: ComponentFixture<PalmsTrailerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsTrailerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsTrailerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
