import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankDialogComponent } from './oil-tank-dialog.component';

describe('OilTankDialogComponent', () => {
  let component: OilTankDialogComponent;
  let fixture: ComponentFixture<OilTankDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OilTankDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OilTankDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
