import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderrunProtectionDialogComponent } from './underrun-protection-dialog.component';

describe('UnderrunProtectionDialogComponent', () => {
  let component: UnderrunProtectionDialogComponent;
  let fixture: ComponentFixture<UnderrunProtectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderrunProtectionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderrunProtectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
