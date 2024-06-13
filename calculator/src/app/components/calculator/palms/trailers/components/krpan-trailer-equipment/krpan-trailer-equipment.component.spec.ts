import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrpanTrailerEquipmentComponent } from './krpan-trailer-equipment.component';

describe('KrpanTrailerEquipmentComponent', () => {
  let component: KrpanTrailerEquipmentComponent;
  let fixture: ComponentFixture<KrpanTrailerEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrpanTrailerEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrpanTrailerEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
