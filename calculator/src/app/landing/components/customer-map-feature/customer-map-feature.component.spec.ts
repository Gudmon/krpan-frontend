import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMapFeatureComponent } from './customer-map-feature.component';

describe('CustomerMapFeatureComponent', () => {
  let component: CustomerMapFeatureComponent;
  let fixture: ComponentFixture<CustomerMapFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMapFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerMapFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
