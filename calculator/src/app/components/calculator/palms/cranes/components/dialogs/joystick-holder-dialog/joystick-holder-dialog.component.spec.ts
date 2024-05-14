import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoystickHolderDialogComponent } from './joystick-holder-dialog.component';

describe('JoystickHolderDialogComponent', () => {
  let component: JoystickHolderDialogComponent;
  let fixture: ComponentFixture<JoystickHolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoystickHolderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoystickHolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
