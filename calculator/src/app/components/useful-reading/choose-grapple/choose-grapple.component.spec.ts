import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGrappleComponent } from './choose-grapple.component';

describe('ChooseGrappleComponent', () => {
  let component: ChooseGrappleComponent;
  let fixture: ComponentFixture<ChooseGrappleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseGrappleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseGrappleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
