import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkAdapterDialogComponent } from './bunk-adapter-dialog.component';

describe('BunkAdapterDialogComponent', () => {
  let component: BunkAdapterDialogComponent;
  let fixture: ComponentFixture<BunkAdapterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BunkAdapterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BunkAdapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
