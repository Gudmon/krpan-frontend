import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorSeatDialogComponent } from './operator-seat-dialog.component';

describe('OperatorSeatDialogComponent', () => {
  let component: OperatorSeatDialogComponent;
  let fixture: ComponentFixture<OperatorSeatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorSeatDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperatorSeatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
