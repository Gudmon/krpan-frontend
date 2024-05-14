import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalFloatingDialogComponent } from './electrical-floating-dialog.component';

describe('ElectricalFloatingDialogComponent', () => {
  let component: ElectricalFloatingDialogComponent;
  let fixture: ComponentFixture<ElectricalFloatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectricalFloatingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectricalFloatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
