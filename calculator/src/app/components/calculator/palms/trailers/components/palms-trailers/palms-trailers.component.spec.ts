import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsTrailersComponent } from './palms-trailers.component';

describe('PalmsTrailersComponent', () => {
  let component: PalmsTrailersComponent;
  let fixture: ComponentFixture<PalmsTrailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsTrailersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsTrailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
