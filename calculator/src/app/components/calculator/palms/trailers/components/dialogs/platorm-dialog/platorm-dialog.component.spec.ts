import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatormDialogComponent } from './platorm-dialog.component';

describe('PlatormDialogComponent', () => {
  let component: PlatormDialogComponent;
  let fixture: ComponentFixture<PlatormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
