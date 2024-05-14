import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurningCounterPlateDialogComponent } from './turning-counter-plate-dialog.component';

describe('TurningCounterPlateDialogComponent', () => {
  let component: TurningCounterPlateDialogComponent;
  let fixture: ComponentFixture<TurningCounterPlateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurningCounterPlateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurningCounterPlateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
