import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMapComponent } from './customer-map.component';

describe('CustomerMapComponent', () => {
  let component: CustomerMapComponent;
  let fixture: ComponentFixture<CustomerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
