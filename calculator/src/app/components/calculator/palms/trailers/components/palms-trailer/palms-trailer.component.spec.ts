import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsTrailerComponent } from './palms-trailer.component';

describe('PalmsTrailerComponent', () => {
  let component: PalmsTrailerComponent;
  let fixture: ComponentFixture<PalmsTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsTrailerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
