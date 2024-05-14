import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CraneDetail } from '../../models/crane-detail';
import { GalleriaModule } from 'primeng/galleria';
import { ActivatedRoute } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { NavigationComponent } from '../navigation/navigation.component';
import { FooterComponent } from '../footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [GalleriaModule, DividerModule, ImageModule, NavigationComponent, FooterComponent, AccordionModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  crane!: CraneDetail;
  responsiveOptions: any[] | undefined;
  images: any[] | undefined;
  excludedKeys: string[] = ['id', 'name', 'reachMax', 'reachWithGrabOpen', 'price', 'imgUrl', 'liftingTorqueNet', 'liftingCapacityAtFourMeters'];

  translationMap: { [key: string]: string } = {
    liftingTorqueNet: 'Nettó emelő nyomaték',
    liftingTorqueGross: 'Bruttó emelő nyomaték',
    liftingCapacityAtFourMeters: 'Emelési kapacitás 4 m-en',
    liftingCapacityAtMaxReach: 'Emelőképesség maximális kinyúlásnál',
    weight: 'Súly',
    slewTorque: 'Forgó nyomaték',
    slewingAngle: 'Forgási szög',
    systemPressure: 'Rendszer nyomás',
    oilQuantityInTank: 'Olaj mennyiség a tartályban',
    slewCylinders: 'Forgó hengerek',
    telescopicStages: 'Teleszkópos szakaszok',
    supportLegs: 'Támogató lábak',
    craneRotatingGear: 'Daru forgó fogaskerék olajfürdőben',
    selfSufficientHydraulicSystem: 'Önfenntartó hidraulikus rendszer szivattyúval',
    threePointLinkage: '3 pontú összekötés',
    controlWithMechanicalJoysticks: 'Irányítás mechanikus joystickokkal',
    crossLeverControlWithElOnOffFunctions: 'Keresztkaros irányítás el. BE/KI funkciókkal',
    propHydraulicJoystickControl: 'Proporcionális hidraulikus (alacsony nyomás) joystick irányítás',
    controlWithProportionalElectricalJoysticks: 'Irányítás proporcionális elektromos joystickokkal',
    highSeatControl: 'Magas ülés irányítás',
    radioRemoteControl: 'Rádiós távirányító',
    controlLeverProtection: 'Irányítókar védelem',
    doubleCastIronPump: 'Dupla öntöttvas szivattyú (tandem) dupla áramkörvezérléssel',
    pistonPump: 'Pozitív dugattyús szivattyú',
    singleFlowPistonPumpWithMultiplier: 'Egyáramlású pozitív dugattyús szivattyú szorozóval',
    doubleFlowPistonPumpWithDoubleCircuitControl: 'Dupla áramlású pozitív dugattyús szivattyú dupla áramkörvezérléssel',
    lsTractorSystemWithoutOwnHydraulicSystem: 'LS Traktor rendszer saját hidraulikus rendszer nélkül',
    oilCooler: 'Olajhűtő',
    rotator30kN: 'Forgató 30 kN (opcionálisan flanschnél)',
    rotator45kN: 'Forgató 45 kN (opcionálisan flanschnél)',
    rotator55kN: 'Forgató 55 kN (opcionálisan flanschnél)',
    flangeRotator45kN55kN: 'Flanschnél forgató 45 kN / 55 kN',
    grabGR120WithFlange: 'Markoló GR 120 flanschnél',
    grabGR130: 'Markoló GR 130',
    grabGR150: 'Markoló GR 150',
    profiGrabGR20GR24GR24BIOGR30orGR38: 'Profi markoló GR 20 / GR 24 / GR 24 BIO / GR 30 vagy GR 38',
    swingDamperSingleDouble: 'Lengéscsillapító (egy vagy kétirányú)',
    operationalLEDLights: 'Működési LED lámpák',
    operatingHoursCounterPressure: 'Működési óra számláló - nyomás',
    hydraulicWinch18t: 'Hidraulikus csőwinch 1,8 t',
    logHolder: 'Farú tartó'
  };

  
  @ViewChild('topElement') topElement!: ElementRef;

  getCraneEntries(): { key: string, value: string }[] {
    return Object.entries(this.crane)
      .filter(([key, value]) => !this.excludedKeys.includes(key))
      .map(([key, value]) => ({ key: this.translationMap[key] || key, value }));
  }

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.setCrane();
    this.setResponsiveOptions();
    this.images =  [ 
      { 
          previewImageSrc:  
          '../../../assets/daru1.png', 
          thumbnailImageSrc:  
          '../../../assets/daru1.png', 
          alt: 'Description for Image 1', 
          title: 'Title 1'
      }, 
      { 
          previewImageSrc:  
          '../../../assets/daru1.1.jpg', 
          thumbnailImageSrc:  
          '../../../assets/daru1.1.jpg', 
          alt: 'Description for Image 2', 
          title: 'Title 2'
      }, 
      { 
          previewImageSrc:  
          '../../../assets/daru1.2.png', 
          thumbnailImageSrc:  
          '../../../assets/daru1.2.png', 
          alt: 'Description for Image 3', 
          title: 'Title 3'
      }, 
      { 
          previewImageSrc:  
          '../../../assets/daru1.3.png', 
          thumbnailImageSrc:  
          '../../../assets/daru1.3.png', 
          alt: 'Description for Image 4', 
          title: 'Title 4'
      }
    ];
    
    
  }
  
  setCrane() {
    this.crane = {
      id: this.route.snapshot.paramMap.get('id')!,
      name: 'KRPAN GD 6,6 K',
      reachMax: '6,6 m',
      reachWithGrabOpen: '7,2 m',
      liftingTorqueNet: '40 kNm',
      liftingTorqueGross: '50 kNm',
      liftingCapacityAtFourMeters: '1020 kg',
      liftingCapacityAtMaxReach: '600 m',
      weight: '900 kg',
      price: 17955,
      imgUrl: "../../../assets/daru1.png",
      slewTorque: '16 kNm',
      slewingAngle: '375 °',
      systemPressure: '220 bar',
      oilQuantityInTank: '70 l',
      slewCylinders: '4',
      telescopicStages: '1',
      supportLegs: 'A / "flap down"',
      craneRotatingGear: 'Standard',
      selfSufficientHydraulicSystem: 'Opcionális',
      threePointLinkage: 'Opcionális',
      controlWithMechanicalJoysticks: 'Standard',
      crossLeverControlWithElOnOffFunctions: 'Opcionális',
      propHydraulicJoystickControl: 'Opcionális',
      controlWithProportionalElectricalJoysticks: 'Opcionális',
      highSeatControl: '/',
      radioRemoteControl: 'Opcionális',
      controlLeverProtection: 'Standard',
      doubleCastIronPump: '/',
      pistonPump: 'Opcionális',
      singleFlowPistonPumpWithMultiplier: '/',
      doubleFlowPistonPumpWithDoubleCircuitControl: '/',
      lsTractorSystemWithoutOwnHydraulicSystem: '/',
      oilCooler: 'Opcionális',
      rotator30kN: 'Standard',
      rotator45kN: 'Standard',
      rotator55kN: 'Opcionális',
      flangeRotator45kN55kN: '/',
      grabGR120WithFlange: 'Standard',
      grabGR130: 'Opcionális',
      grabGR150: 'Opcionális',
      profiGrabGR20GR24GR24BIOGR30orGR38: 'Opcionális',
      swingDamperSingleDouble: 'Opcionális',
      operationalLEDLights: 'Opcionális',
      operatingHoursCounterPressure: 'Opcionális',
      hydraulicWinch18t: '/',
      logHolder: '/',
    };
  }

  setResponsiveOptions(){
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  }
}



