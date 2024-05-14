import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkExtensionDialogComponent } from './bunk-extension-dialog.component';

describe('BunkExtensionDialogComponent', () => {
  let component: BunkExtensionDialogComponent;
  let fixture: ComponentFixture<BunkExtensionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BunkExtensionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BunkExtensionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
