import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraneLightDialogComponent } from './crane-light-dialog.component';

describe('CraneLightDialogComponent', () => {
  let component: CraneLightDialogComponent;
  let fixture: ComponentFixture<CraneLightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraneLightDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CraneLightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
