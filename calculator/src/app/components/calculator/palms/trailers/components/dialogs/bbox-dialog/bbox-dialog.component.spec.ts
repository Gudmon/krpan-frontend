import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BboxDialogComponent } from './bbox-dialog.component';

describe('BboxDialogComponent', () => {
  let component: BboxDialogComponent;
  let fixture: ComponentFixture<BboxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BboxDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BboxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
