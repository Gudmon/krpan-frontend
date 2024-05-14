import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBlocksDialogComponent } from './control-blocks-dialog.component';

describe('ControlBlocksDialogComponent', () => {
  let component: ControlBlocksDialogComponent;
  let fixture: ComponentFixture<ControlBlocksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlBlocksDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlBlocksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
