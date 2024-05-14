import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DampingsDialogComponent } from './dampings-dialog.component';

describe('DampingsDialogComponent', () => {
  let component: DampingsDialogComponent;
  let fixture: ComponentFixture<DampingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DampingsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DampingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
