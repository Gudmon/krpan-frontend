import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTrailerComponent } from './choose-trailer.component';

describe('ChooseTrailerComponent', () => {
  let component: ChooseTrailerComponent;
  let fixture: ComponentFixture<ChooseTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseTrailerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
