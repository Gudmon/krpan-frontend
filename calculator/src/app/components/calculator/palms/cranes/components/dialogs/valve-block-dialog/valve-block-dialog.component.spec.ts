import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveBlockDialogComponent } from './valve-block-dialog.component';

describe('ValveBlockDialogComponent', () => {
  let component: ValveBlockDialogComponent;
  let fixture: ComponentFixture<ValveBlockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValveBlockDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValveBlockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
