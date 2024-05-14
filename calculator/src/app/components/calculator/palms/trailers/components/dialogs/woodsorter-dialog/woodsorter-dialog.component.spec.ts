import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodsorterDialogComponent } from './woodsorter-dialog.component';

describe('WoodsorterDialogComponent', () => {
  let component: WoodsorterDialogComponent;
  let fixture: ComponentFixture<WoodsorterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WoodsorterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WoodsorterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
