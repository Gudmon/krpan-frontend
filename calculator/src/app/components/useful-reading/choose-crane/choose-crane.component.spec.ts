import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCraneComponent } from './choose-crane.component';

describe('ChooseCraneComponent', () => {
  let component: ChooseCraneComponent;
  let fixture: ComponentFixture<ChooseCraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseCraneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseCraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
