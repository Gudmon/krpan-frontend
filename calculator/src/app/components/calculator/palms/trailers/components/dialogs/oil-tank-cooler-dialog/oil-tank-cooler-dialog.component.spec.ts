import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankCoolerDialogComponent } from './oil-tank-cooler-dialog.component';

describe('OilTankCoolerDialogComponent', () => {
  let component: OilTankCoolerDialogComponent;
  let fixture: ComponentFixture<OilTankCoolerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OilTankCoolerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OilTankCoolerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
