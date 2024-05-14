import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodcontrolDialogComponent } from './woodcontrol-dialog.component';

describe('WoodcontrolDialogComponent', () => {
  let component: WoodcontrolDialogComponent;
  let fixture: ComponentFixture<WoodcontrolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WoodcontrolDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WoodcontrolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
