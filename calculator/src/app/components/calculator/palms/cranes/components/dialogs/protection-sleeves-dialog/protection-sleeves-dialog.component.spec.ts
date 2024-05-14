import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionSleevesDialogComponent } from './protection-sleeves-dialog.component';

describe('ProtectionSleevesDialogComponent', () => {
  let component: ProtectionSleevesDialogComponent;
  let fixture: ComponentFixture<ProtectionSleevesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectionSleevesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProtectionSleevesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
