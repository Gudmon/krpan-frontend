import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerDataItemComponent } from './machine-data-item.component';

describe('TrailerDataItemComponent', () => {
  let component: TrailerDataItemComponent;
  let fixture: ComponentFixture<TrailerDataItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailerDataItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrailerDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
