import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsterLockDialogComponent } from './bolster-lock-dialog.component';

describe('BolsterLockDialogComponent', () => {
  let component: BolsterLockDialogComponent;
  let fixture: ComponentFixture<BolsterLockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BolsterLockDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BolsterLockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
