import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropulsionsDialogComponent } from './propulsions-dialog.component';

describe('PropulsionDialogComponent', () => {
  let component: PropulsionsDialogComponent;
  let fixture: ComponentFixture<PropulsionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropulsionsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropulsionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
