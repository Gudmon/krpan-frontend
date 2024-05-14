import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsCranesComponent } from './palms-cranes.component';

describe('PalmsCranesComponent', () => {
  let component: PalmsCranesComponent;
  let fixture: ComponentFixture<PalmsCranesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsCranesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsCranesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
