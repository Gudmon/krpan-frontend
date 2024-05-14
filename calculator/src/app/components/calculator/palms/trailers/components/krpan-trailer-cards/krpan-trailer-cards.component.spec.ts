import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsTrailerCardsComponent } from './krpan-trailer-cards.component';

describe('PalmsTrailerCardsComponent', () => {
  let component: PalmsTrailerCardsComponent;
  let fixture: ComponentFixture<PalmsTrailerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsTrailerCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsTrailerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
