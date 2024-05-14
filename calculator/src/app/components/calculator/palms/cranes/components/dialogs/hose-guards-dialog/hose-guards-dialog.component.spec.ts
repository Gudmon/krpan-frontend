import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoseGuardsDialogComponent } from './hose-guards-dialog.component';

describe('HoseGuardsDialogComponent', () => {
  let component: HoseGuardsDialogComponent;
  let fixture: ComponentFixture<HoseGuardsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoseGuardsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoseGuardsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
