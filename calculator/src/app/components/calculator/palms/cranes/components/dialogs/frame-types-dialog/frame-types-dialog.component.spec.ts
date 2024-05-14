import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameTypesDialogComponent } from './frame-types-dialog.component';

describe('FrameTypesDialogComponent', () => {
  let component: FrameTypesDialogComponent;
  let fixture: ComponentFixture<FrameTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameTypesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
