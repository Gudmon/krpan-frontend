import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomguardDialogComponent } from './boomguard-dialog.component';

describe('BoomguardDialogComponent', () => {
  let component: BoomguardDialogComponent;
  let fixture: ComponentFixture<BoomguardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoomguardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoomguardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
