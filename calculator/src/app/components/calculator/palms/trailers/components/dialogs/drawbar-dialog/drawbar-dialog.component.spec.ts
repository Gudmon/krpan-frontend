import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawbarDialogComponent } from './drawbar-dialog.component';

describe('DrawbarDialogComponent', () => {
  let component: DrawbarDialogComponent;
  let fixture: ComponentFixture<DrawbarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawbarDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawbarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
