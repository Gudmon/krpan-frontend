import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatorBrakeDialogComponent } from './rotator-brakes-dialog.component';

describe('RotatorBrakeDialogComponent', () => {
  let component: RotatorBrakeDialogComponent;
  let fixture: ComponentFixture<RotatorBrakeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotatorBrakeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RotatorBrakeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
