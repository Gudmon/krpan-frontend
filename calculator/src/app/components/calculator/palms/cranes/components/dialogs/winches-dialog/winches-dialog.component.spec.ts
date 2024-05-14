import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinchesDialogComponent } from './winches-dialog.component';

describe('WinchesDialogComponent', () => {
  let component: WinchesDialogComponent;
  let fixture: ComponentFixture<WinchesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinchesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinchesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
