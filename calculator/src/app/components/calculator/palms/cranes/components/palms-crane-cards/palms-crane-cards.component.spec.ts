import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsCranesCardsComponent } from './palms-crane-cards.component';

describe('PalmsCranesCardsComponent', () => {
  let component: PalmsCranesCardsComponent;
  let fixture: ComponentFixture<PalmsCranesCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsCranesCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsCranesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
