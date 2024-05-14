import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatorsDialogComponent } from './rotators-dialog.component';

describe('RotatorsDialogComponent', () => {
  let component: RotatorsDialogComponent;
  let fixture: ComponentFixture<RotatorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotatorsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RotatorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
