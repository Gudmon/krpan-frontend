import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrakesDialogComponent } from './brakes-dialog.component';

describe('BrakesDialogComponent', () => {
  let component: BrakesDialogComponent;
  let fixture: ComponentFixture<BrakesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrakesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrakesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
