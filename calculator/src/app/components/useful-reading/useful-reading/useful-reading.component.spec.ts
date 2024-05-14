import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulReadingComponent } from './useful-reading.component';

describe('UsefulReadingComponent', () => {
  let component: UsefulReadingComponent;
  let fixture: ComponentFixture<UsefulReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsefulReadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsefulReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
