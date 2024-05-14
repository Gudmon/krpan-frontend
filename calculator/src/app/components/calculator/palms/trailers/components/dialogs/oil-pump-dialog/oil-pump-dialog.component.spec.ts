import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilPumpDialogComponent } from './oil-pump-dialog.component';

describe('OilPumpDialogComponent', () => {
  let component: OilPumpDialogComponent;
  let fixture: ComponentFixture<OilPumpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OilPumpDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OilPumpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
