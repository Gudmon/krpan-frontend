import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsawHolderDialogComponent } from './chainsaw-holder-dialog.component';

describe('ChainsawHolderDialogComponent', () => {
  let component: ChainsawHolderDialogComponent;
  let fixture: ComponentFixture<ChainsawHolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainsawHolderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChainsawHolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
