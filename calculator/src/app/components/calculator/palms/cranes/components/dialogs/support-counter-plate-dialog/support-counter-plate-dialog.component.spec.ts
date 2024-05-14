import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCounterPlateDialogComponent } from './support-counter-plate-dialog.component';

describe('SupportCounterPlateDialogComponent', () => {
  let component: SupportCounterPlateDialogComponent;
  let fixture: ComponentFixture<SupportCounterPlateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportCounterPlateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportCounterPlateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
