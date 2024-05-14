import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraneOilcoolerDialogComponent } from './crane-oilcooler-dialog.component';

describe('CraneOilcoolerDialogComponent', () => {
  let component: CraneOilcoolerDialogComponent;
  let fixture: ComponentFixture<CraneOilcoolerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraneOilcoolerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CraneOilcoolerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
