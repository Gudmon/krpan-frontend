import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameExtensionDialogComponent } from './frame-extension-dialog.component';

describe('FrameExtensionDialogComponent', () => {
  let component: FrameExtensionDialogComponent;
  let fixture: ComponentFixture<FrameExtensionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameExtensionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameExtensionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
