import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportLegDialogComponent } from './support-leg-dialog.component';

describe('SupportLegDialogComponent', () => {
  let component: SupportLegDialogComponent;
  let fixture: ComponentFixture<SupportLegDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportLegDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportLegDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
