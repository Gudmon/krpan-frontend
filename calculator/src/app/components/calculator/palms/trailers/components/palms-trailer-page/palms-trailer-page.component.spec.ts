import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsTrailerPageComponent } from './palms-trailer-page.component';

describe('PalmsTrailerPageComponent', () => {
  let component: PalmsTrailerPageComponent;
  let fixture: ComponentFixture<PalmsTrailerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsTrailerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsTrailerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
