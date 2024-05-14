import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightDialogComponent } from './trailer-light-dialog.component';

describe('LightDialogComponent', () => {
  let component: LightDialogComponent;
  let fixture: ComponentFixture<LightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
