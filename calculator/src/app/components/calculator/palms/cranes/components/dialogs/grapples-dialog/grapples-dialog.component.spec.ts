import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapplesDialogComponent } from './grapples-dialog.component';

describe('GrapplesDialogComponent', () => {
  let component: GrapplesDialogComponent;
  let fixture: ComponentFixture<GrapplesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrapplesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrapplesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
