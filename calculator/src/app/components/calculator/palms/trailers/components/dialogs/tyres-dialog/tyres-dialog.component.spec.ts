import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyresDialogComponent } from './tyres-dialog.component';

describe('TyresDialogComponent', () => {
  let component: TyresDialogComponent;
  let fixture: ComponentFixture<TyresDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TyresDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TyresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
