import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmsOverviewComponent } from './palms-overview.component';

describe('PalmsOverviewComponent', () => {
  let component: PalmsOverviewComponent;
  let fixture: ComponentFixture<PalmsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmsOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalmsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
