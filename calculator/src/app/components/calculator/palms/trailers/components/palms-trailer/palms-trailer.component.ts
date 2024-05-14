import { provideAnimations } from '@angular/platform-browser/animations';
import { PalmsCraneOverview } from './../../../cranes/models/palms-crane-overview';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PalmsService } from '../../../shared/services/palms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { ImageModule } from 'primeng/image';
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { PalmsTrailerConfigService } from '../../services/palms-trailer-config.service';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { Subject, forkJoin, takeUntil, map } from 'rxjs';
import { BrakesDialogComponent } from "../dialogs/brakes-dialog/brakes-dialog.component";
import { DrawbarDialogComponent } from "../dialogs/drawbar-dialog/drawbar-dialog.component";
import { PlatormDialogComponent } from '../dialogs/platorm-dialog/platorm-dialog.component';
import { OilPumpDialogComponent } from '../dialogs/oil-pump-dialog/oil-pump-dialog.component';
import { Checkbox, CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { OilTankDialogComponent } from '../dialogs/oil-tank-dialog/oil-tank-dialog.component';
import { OilTankCoolerDialogComponent } from "../dialogs/oil-tank-cooler-dialog/oil-tank-cooler-dialog.component";
import { BolsterLockDialogComponent } from "../dialogs/bolster-lock-dialog/bolster-lock-dialog.component";
import { BboxDialogComponent } from "../dialogs/bbox-dialog/bbox-dialog.component";
import { WoodsorterDialogComponent } from "../dialogs/woodsorter-dialog/woodsorter-dialog.component";
import { ChainsawHolderDialogComponent } from "../dialogs/chainsaw-holder-dialog/chainsaw-holder-dialog.component";
import { UnderrunProtectionDialogComponent } from "../dialogs/underrun-protection-dialog/underrun-protection-dialog.component";
import { SupportLegDialogComponent } from "../dialogs/support-leg-dialog/support-leg-dialog.component";
import { TrailerLightDialogComponent } from "../dialogs/trailer-light-dialog/trailer-light-dialog.component";
import { TyresDialogComponent } from "../dialogs/tyres-dialog/tyres-dialog.component";
import { LoadingService } from '../../../../../../services/loading.service';
import { PalmsTrailerCalculatorHintsComponent } from '../palms-trailer-calculator-hints/palms-trailer-calculator-hints.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { CardModule } from 'primeng/card';
import { PalmsTrailer } from '../../models/palms-trailer';
import { PalmsTrailerInformationComponent } from "../palms-trailer-information/palms-trailer-information.component";
import { PalmsTrailerCardsComponent } from "../palms-trailer-cards/palms-trailer-cards.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { PalmsCraneComponent } from "../../../cranes/components/palms-crane/palms-crane.component";
import { PalmsCraneCardsComponent } from '../../../cranes/components/palms-crane-cards/palms-crane-cards.component';
import { PropulsionsDialogComponent } from "../dialogs/propulsions-dialog/propulsions-dialog.component";
import { BunkAdapterDialogComponent } from "../dialogs/bunk-adapter-dialog/bunk-adapter-dialog.component";
import { BunkExtensionDialogComponent } from "../dialogs/bunk-extension-dialog/bunk-extension-dialog.component";
import { FrameExtensionDialogComponent } from "../dialogs/frame-extension-dialog/frame-extension-dialog.component";

@Component({
    selector: 'app-palms-trailer',
    standalone: true,
    templateUrl: './palms-trailer.component.html',
    styleUrl: './palms-trailer.component.css',
    imports: [NavigationComponent, CardModule, FooterComponent, RadioButtonModule, PalmsCraneCardsComponent, TrailerDataItemComponent, AccordionModule, DividerModule, DropdownModule, InputSwitchModule, GalleriaModule, FormsModule, ReactiveFormsModule, ButtonModule, ImageModule, ListboxModule, FormatPricePipe, BrakesDialogComponent, DrawbarDialogComponent, PlatormDialogComponent, OilPumpDialogComponent, OilTankDialogComponent, CheckboxModule, OilTankCoolerDialogComponent, BolsterLockDialogComponent, BboxDialogComponent, WoodsorterDialogComponent, ChainsawHolderDialogComponent, UnderrunProtectionDialogComponent, SupportLegDialogComponent, TrailerLightDialogComponent, TyresDialogComponent, PalmsTrailerCalculatorHintsComponent, AccessoryItemComponent, PalmsTrailerInformationComponent, PalmsTrailerCardsComponent, PalmsCraneComponent, PropulsionsDialogComponent, BunkAdapterDialogComponent, BunkExtensionDialogComponent, FrameExtensionDialogComponent]
})
export class PalmsTrailerComponent implements OnInit, OnDestroy{
  @Input() trailer!: PalmsTrailer
  craneId?: number
  @Input() id?: number;
  fromCrane: boolean = false;
  trailerSelected: boolean = false;
  hintsChecked: boolean = true;
  woodSorterChecked: boolean = false;
  woodSorterNumberSelected: boolean = false;
  bunkAdapterChecked: boolean = false;
  bunkAdapterNumberSelected: boolean = false;
  bunkExtensionChecked: boolean = false;
  bunkExtensionNumberSelected: boolean = false;
  stanchionExtensionChecked: boolean = false;
  stanchionExtensionNumberSelected: boolean = false;
  
  @ViewChild('oilCoolerCheckBox') oilCoolerCheckBox!: Checkbox;
  @ViewChild('woodSorterCheckBox') woodSorterCheckBox!: Checkbox;
  @ViewChild('woodSorterDropdown') woodSorterDropdown!: Dropdown;
  @ViewChild('bunkAdapterCheckBox') bunkAdapterCheckBox!: Checkbox;
  @ViewChild('bunkAdapterDropdown') bunkAdapterDropdown!: Dropdown;
  @ViewChild('bunkExtensionCheckBox') bunkExtensionCheckBox!: Checkbox;
  @ViewChild('bunkExtensionDropdown') bunkExtensionDropdown!: Dropdown;
  @ViewChild('stanchionExtensionCheckBox') stanchionExtensionCheckBox!: Checkbox;
  @ViewChild('stanchionExtensionDropdown') stanchionExtensionDropdown!: Dropdown;
  
  showBrakesDialog: boolean = false;
  showPropulsionsDialog: boolean = false;
  showDrawbarsDialog: boolean = false;
  showPlatformsDialog: boolean = false;
  showOilPumpsDialog: boolean = false;
  showOilTanksDialog: boolean = false;
  showTrailerOilCoolerDialog: boolean = false;
  showBolsterLockDialog: boolean = false;
  showBboxDialog: boolean = false;
  showWoodSorterDialog: boolean = false;
  showHandBrakeDialog: boolean = false;
  showChainsawHolderDialog: boolean = false;
  showUnderrunProtectionDialog: boolean = false;
  showSupportLegDialog: boolean = false;
  showLightsDialog: boolean = false;
  showTyresDialog: boolean = false;
  showBunkAdapterDialog: boolean = false;
  showBunkExtensionDialog: boolean = false;
  showFrameExtensionDialog: boolean = false;
  showHydroPackDialog: boolean = false;

  stanchions: ConfigurationItem[] = [];
  brakes: ConfigurationItem[] = [];
  propulsions: ConfigurationItem[] = [];
  drawbars: ConfigurationItem[] = [];
  platforms: ConfigurationItem[] = [];
  oilPumps: ConfigurationItem[] = [];
  oilTanks: ConfigurationItem[] = [];
  trailerOilCooler: ConfigurationItem | undefined = undefined;
  bolsterLock: ConfigurationItem | undefined = undefined;
  bbox: ConfigurationItem | undefined = undefined;
  woodSorter: ConfigurationItem | undefined = undefined;
  handBrake: ConfigurationItem | undefined = undefined;
  chainsawHolder: ConfigurationItem | undefined = undefined;
  underrunProtection: ConfigurationItem | undefined = undefined;
  supportLegs: ConfigurationItem[] = [];
  lights: ConfigurationItem[] = [];
  tyres: ConfigurationItem[] = [];
  bunkAdapter: ConfigurationItem | undefined = undefined;
  bunkExtension: ConfigurationItem | undefined = undefined;
  frameExtension: ConfigurationItem | undefined = undefined;
  trailerShipping: ConfigurationItem | undefined = undefined;
  MOT: ConfigurationItem | undefined = undefined;
  stanchionExtension: ConfigurationItem | undefined = undefined;
  hydroPack: ConfigurationItem | undefined = undefined;

  selectedConfigurationItems: ConfigurationItem[] = [];

  originalStanchionPrice = 0;
  originalBrakePrice = 0;
  originalPropulsionPrice = 0;
  originalDrawbarPrice = 0;
  originalPlatformPrice = 0;
  originalOilPumpPrice = 0;
  originalOilTankPrice = 0;
  originalTrailerOilCoolerPrice = 0;
  originalBolsterLockPrice = 0;
  originalBboxPrice = 0;
  originalWoodSorterPrice = 0;
  originalHandBrakePrice = 0;
  originalChainsawHolderPrice = 0;
  originalUnderrunProtectionPrice = 0;
  originalSupportLegPrice = 0;
  originalLightPrice = 0;
  originalTyrePrice = 0;
  originalBunkAdapterPrice = 0;
  originalBunkExtensionPrice = 0;
  originalFrameExtensionPrice = 0;
  originalStanchionExtensionPrice = 0;
  originalHydroPackPrice = 0;

  initialWoodSorterPrice = 0;
  initialWoodSorterNumber = 0;
  previousWoodSorterNumber = 0;

  initialBunkAdapterPrice = 0;
  initialBunkAdapterNumber = 0;
  previousBunkAdapterNumber = 0;

  initialBunkExtensionPrice = 0;
  initialBunkExtensionNumber = 0;
  previousBunkExtensionNumber = 0;

  initialStanchionExtensionPrice = 0;
  initialStanchionExtensionNumber = 0;
  previousStanchionExtensionNumber = 0;

  initialTrailerPrice = 0;

  originalStanchion: ConfigurationItem | undefined = undefined;
  originalBrake: ConfigurationItem | undefined = undefined;
  originalPropulsion: ConfigurationItem | undefined = undefined;
  originalDrawbar: ConfigurationItem | undefined = undefined;
  originalPlatform: ConfigurationItem | undefined = undefined;
  originalOilPump: ConfigurationItem | undefined = undefined;
  originalOilTank: ConfigurationItem | undefined = undefined;
  originalTrailerOilCooler: ConfigurationItem | undefined = undefined;
  originalBolsterLock: ConfigurationItem | undefined = undefined;
  originalBbox: ConfigurationItem | undefined = undefined;
  originalWoodSorter: ConfigurationItem | undefined = undefined;
  woodSorterArrayElements: any[] | undefined = [];
  originalHandBrake: ConfigurationItem | undefined = undefined;
  originalChainsawHolder: ConfigurationItem | undefined = undefined;
  originalUnderrunProtection: ConfigurationItem | undefined = undefined;
  originalSupportLeg: ConfigurationItem | undefined = undefined;
  originalLight: ConfigurationItem | undefined = undefined;
  originalTyre: ConfigurationItem | undefined = undefined;
  originalBunkAdapter: ConfigurationItem | undefined = undefined;
  bunkAdapterArrayElements: any[] | undefined = [];
  originalBunkExtension: ConfigurationItem | undefined = undefined;
  bunkExtensionArrayElements: any[] | undefined = [];
  originalFrameExtension: ConfigurationItem | undefined = undefined;
  originalShipping: ConfigurationItem | undefined = undefined;
  originalMOT: ConfigurationItem | undefined = undefined;
  originalStanchionExtension: ConfigurationItem | undefined = undefined;
  stanchionExtensionArrayElements: any[] | undefined = [];
  originalHydroPack: ConfigurationItem | undefined = undefined;

  trailerFormGroup: FormGroup = new FormGroup({
    selectedTrailer: new FormControl<string>(''),
    selectedStanchion: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedPropulsion: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedDrawbar: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedPlatform: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedOilPump: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedOilTank: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedTrailerOilCooler: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBolsterLock: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBbox: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedWoodSorter: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedHandBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedChainsawHolder: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedUnderrunProtection: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedSupportLeg: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedLight: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedTyre: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBunkAdapter: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBunkExtension: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedFrameExtension: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedShipping: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedMOT: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedStanchionExtension: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedHydroPack: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
  });

  private initializeFormGroup(): void {
    
    this.trailerFormGroup = this.fb.group({
      selectedTrailer: [this.trailer.name],
      selectedStanchion: [this.stanchions[0]],
      selectedBrake: null,
      selectedPropulsion: null,
      selectedDrawbar: null,
      selectedPlatform: null,
      selectedOilPump: null,
      selectedOilTank: null,
      selectedTrailerOilCooler: null,
      selectedBolsterLock: null,
      selectedBbox: null,
      selectedWoodSorter: null,
      selectedHandBrake: null,
      selectedChainsawHolder: null,
      selectedUnderrunProtection: null,
      selectedSupportLeg: null,
      selectedLight: null,
      selectedTyre: null,
      selectedCrane: null,
      selectedBunkAdapter: null,
      selectedBunkExtension: null,
      selectedFrameExtension: null,
      selectedShipping: this.trailerShipping,
      selectedMOT: this.MOT,
      selectedStanchionExtension: null,
      selectedHydroPack: null,
    });
  }   
  private destroy$ = new Subject<void>();
  constructor(
    readonly palmsService: PalmsService,
    private palmsTrailerConfigService: PalmsTrailerConfigService,
    readonly loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    if (this.id) {
      this.fromCrane = true;
    } else {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    }

    this.loadingService.enableLoader();
    this.palmsService.getTrailer(this.id).pipe().subscribe((response) => {
      if(!this.fromCrane){
        this.palmsService._deleteTrailer.next(true);
        this.palmsService._deleteCrane.next(true);
        this.palmsService._trailerSelected.next(false);
        this.palmsService._craneSelected.next(false);
        this.palmsService._selectedTrailer.next(undefined);
        this.palmsService._selectedCrane.next(undefined);
        this.palmsService._selectedTrailer.next(response); 
      }
     
      this.trailer = response as PalmsTrailer;
      
    }).add(() => {
      this.loadingService.disableLoader();
    })
    
    if(this.fromCrane){
      this.palmsService.selectedTrailer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((trailer) => {
        this.id = trailer?.id;
        this.loadTrailerConfigurations(this.id!);
        this.palmsService._selectedAccordion.set(1);
      });
    }
    else {
      this.palmsService._selectedAccordion.set(0);
      this.palmsService.deleteCrane();
      this.palmsService.deleteTrailer();
    }

    this.palmsService.deleteTrailer$.subscribe(() => {
      this.delete();
    })
  }

  getTrailerName(){
    return this.palmsService._selectedTrailer.value?.name
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCranes(){
    const craneNames = this.trailer.crane.map((crane) => crane.name);
    return craneNames;
  }

  loadTrailerConfigurations(id: number){ 
    if(id){
      this.loadingService.enableLoader();
      const stanchions$ = this.palmsTrailerConfigService.getStanchions(id);
      const brakes$ = this.palmsTrailerConfigService.getBrakes(id);
      const propulsions$ = this.palmsTrailerConfigService.getPropulsions(id);
      const drawbars$ = this.palmsTrailerConfigService.getDrawbars(id);
      const platforms$ = this.palmsTrailerConfigService.getPlatforms(id);
      const oilPumps$ = this.palmsTrailerConfigService.getOilPumps(id);
      const oilTanks$ = this.palmsTrailerConfigService.getOilTanks(id);
      const trailerOilCooler$ = this.palmsTrailerConfigService.getTrailerOilCooler(id);
      const bolsterLock$ = this.palmsTrailerConfigService.getBolsterLock(id);
      const bbox$ = this.palmsTrailerConfigService.getBBox(id);
      const woodSorter$ = this.palmsTrailerConfigService.getWoodSorter(id);
      const handBrake$ = this.palmsTrailerConfigService.getHandBrake(id);
      const chainsawHolder$ = this.palmsTrailerConfigService.getChainsawHolder(id);
      const underrunProtection$ = this.palmsTrailerConfigService.getUnderrunProtection(id);
      const supportLegs$ = this.palmsTrailerConfigService.getSupportLegs(id);
      const lights$ = this.palmsTrailerConfigService.getLights(id);
      const tyres$ = this.palmsTrailerConfigService.getTyres(id);
      const bunkAdapter$ = this.palmsTrailerConfigService.getBunkAdapter(id);
      const bunkExtension$ = this.palmsTrailerConfigService.getBunkExtension(id);
      const frameExtension$ = this.palmsTrailerConfigService.getFrameExtension(id);
      const trailerShipping$ = this.palmsTrailerConfigService.getShipping(id);
      const MOT$ = this.palmsTrailerConfigService.getMOT(id);
      const stanchionExtension$ = this.palmsTrailerConfigService.getStanchionExtension(id);
      const hydroPack$ = this.palmsTrailerConfigService.getHydroPack(id);
      
      const request = forkJoin([stanchions$, brakes$, propulsions$, 
        drawbars$, platforms$, oilPumps$, oilTanks$, trailerOilCooler$, 
        bolsterLock$, bbox$, woodSorter$, handBrake$, chainsawHolder$, 
        underrunProtection$, supportLegs$, lights$, tyres$, 
        bunkAdapter$, bunkExtension$, frameExtension$, trailerShipping$, MOT$, 
        stanchionExtension$, hydroPack$]);
     
      request.subscribe(([stanchions, brakes, propulsions,
         drawbars, platforms, oilPumps, oilTanks, trailerOilCooler,
          bolsterLock, bbox, woodSorter, handBrake, chainsawHolder, 
          underrunProtection, supportLegs, lights, tyres,
          bunkAdapter, bunkExtension, frameExtension, trailerShipping, MOT, 
          stanchionExtension, hydroPack]) => {
        if (stanchions.length > 0){
          
          this.stanchions = stanchions;
          this.palmsService._trailerPrice.set(Number(stanchions[0].price));
          this.originalStanchion = stanchions[0];
          this.originalStanchionPrice = Number(stanchions[0].price);
          this.palmsService.selectedStanchion.set(stanchions[0]);
        }
        
        if (brakes.length > 0){
          this.brakes = brakes;
        }
        
        if (propulsions.length > 0){
          this.propulsions = propulsions;
        }
        
        if (drawbars.length > 0){
          this.drawbars = drawbars;
        }
  
        if (platforms.length > 0){
          this.platforms = platforms;
        }    
  
        if (oilPumps.length > 0){
          this.oilPumps = oilPumps;
        }    
  
        if (oilTanks.length > 0){
          this.oilTanks = oilTanks;
        }
  
        if (trailerOilCooler){
          this.trailerOilCooler = trailerOilCooler;

        }

        if (bolsterLock){
          this.bolsterLock = bolsterLock;
        }
  
        if (bbox){
          this.bbox = bbox;
        }
  
        if (woodSorter){
          this.woodSorter = woodSorter;
          this.initialWoodSorterPrice = Number(woodSorter.price) 
        }
  
        if (handBrake){
          this.handBrake = handBrake;
        }
  
        if (chainsawHolder){
          this.chainsawHolder = chainsawHolder;
        }
  
        if (underrunProtection){
          this.underrunProtection = underrunProtection;
        }
  
        if (supportLegs.length > 0){
          this.supportLegs = supportLegs;
        }
  
        if (lights.length > 0){
          this.lights = lights;
        }
  
        if (tyres.length > 0){
          this.tyres = tyres;
        }

        if (bunkAdapter){
          this.bunkAdapter = bunkAdapter;
          this.initialBunkAdapterPrice = Number(bunkAdapter.price);
        }

        if (bunkExtension){
          this.bunkExtension = bunkExtension;
          this.initialBunkExtensionPrice = Number(bunkExtension.price);
        }

        if (frameExtension){
          this.frameExtension = frameExtension;
        }

        if (trailerShipping){
          this.trailerShipping = trailerShipping;
          this.palmsService.selectedTrailerShipping.set(trailerShipping);
          this.palmsService._trailerPrice.update((trailerPrice => trailerPrice + Number(trailerShipping.price)));
        }

        if (MOT){
          this.MOT = MOT;
          this.palmsService.selectedMOT.set(MOT);
          this.palmsService._trailerPrice.update((trailerPrice => trailerPrice + Number(MOT.price)));
        }

        if (stanchionExtension){
          this.stanchionExtension = stanchionExtension;
          this.initialStanchionExtensionPrice = Number(stanchionExtension.price);
        }

        if (hydroPack){
          this.hydroPack = hydroPack;
        }
        
        this.trailerSelected = true;
        this.initializeFormGroup();
    } 
    
    ).add(() => {
      this.loadingService.disableLoader();
      this.palmsService._trailerSelected.next(true);

      
    })};
  }

  handleStanchionChange(event: ListboxChangeEvent) {
    const previousValue = this.originalStanchionPrice;
    this.originalStanchionPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalStanchionPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalStanchion = event.value;
      this.palmsService.selectedStanchion.set(event.value)
    } else {
      this.originalStanchion = undefined;
      this.palmsService.selectedStanchion.set(undefined)
    }

    const maxNumber = Number(this.originalStanchion?.code![1]) * 2;
    this.woodSorterArrayElements = [];
    this.bunkAdapterArrayElements = [];
    this.bunkExtensionArrayElements = [];
    this.stanchionExtensionArrayElements = [];
    if(this.originalStanchion) this.initialTrailerPrice = Number(this.originalStanchion!.price);
    this.originalWoodSorter = undefined;
    this.originalBunkAdapter = undefined;
    this.originalBunkExtension = undefined;
    this.originalStanchionExtension = undefined;

    setTimeout(() => {
      if(this.woodSorterCheckBox){
        this.woodSorterCheckBox.writeValue(false);
        this.woodSorterChecked = false;

        for (let i = 1; i <= maxNumber; i++) {
          this.woodSorterArrayElements?.push({number: i});  
        }
      }

      if(this.bunkAdapterCheckBox){
        this.bunkAdapterCheckBox.writeValue(false);
        this.bunkAdapterChecked = false;

        for (let i = 1; i <= maxNumber; i++) {
          this.bunkAdapterArrayElements?.push({number: i});  
        }
      }

      if(this.bunkExtensionCheckBox){
        this.bunkExtensionCheckBox.writeValue(false);
        this.bunkExtensionChecked = false;

        for (let i = 1; i <= maxNumber; i++) {
          this.bunkExtensionArrayElements?.push({number: i});  
        }
      }

      if(this.stanchionExtensionCheckBox){
        this.stanchionExtensionCheckBox.writeValue(false);
        this.stanchionExtensionChecked = false;

        for (let i = 1; i <= maxNumber; i++) {
          this.stanchionExtensionArrayElements?.push({number: i});  
        }
      }
      
    },50);
    
    if(this.initialWoodSorterNumber > 0){
      this.palmsService._trailerPrice.update(value => value - (Number(this.initialWoodSorterNumber * this.initialWoodSorterPrice)))
      this.initialWoodSorterNumber = 0;
      this.previousWoodSorterNumber = 0;
      this.palmsService.selectedWoodSorter.set(undefined);
    }

    if(this.initialBunkAdapterNumber > 0){
      this.palmsService._trailerPrice.update(value => value - (Number(this.initialBunkAdapterNumber * this.initialBunkAdapterPrice)))
      this.initialBunkAdapterNumber = 0;
      this.previousBunkAdapterNumber = 0;
      this.palmsService.selectedBunkAdapter.set(undefined);
    }

    if(this.initialBunkExtensionNumber > 0){
      this.palmsService._trailerPrice.update(value => value - (Number(this.initialBunkExtensionNumber * this.initialBunkExtensionPrice)))
      this.initialBunkExtensionNumber = 0;
      this.previousBunkExtensionNumber = 0;
      this.palmsService.selectedBunkExtension.set(undefined);
    }

    if(this.initialStanchionExtensionNumber > 0){
      this.palmsService._trailerPrice.update(value => value - (Number(this.initialStanchionExtensionNumber * this.initialStanchionExtensionPrice)))
      this.initialStanchionExtensionNumber = 0;
      this.previousStanchionExtensionNumber = 0;
      this.palmsService.selectedStanchionExtension.set(undefined);
    }
  }

  handleBrakeChange(event: ListboxChangeEvent) {
    const previousValue = this.originalBrakePrice;
    this.originalBrakePrice = event.value ? event.value.price : 0;
    const nextValue = this.originalBrakePrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalBrake = event.value;
      this.palmsService.selectedBrake.set(event.value)
    } else {
      this.originalBrake = undefined;
      this.palmsService.selectedBrake.set(undefined)
    }
  }

  handlePropulsionChange(event: ListboxChangeEvent) {
    const previousValue = this.originalPropulsionPrice
    this.originalPropulsionPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalPropulsionPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    let updatedTyres: ConfigurationItem[] = [];

    if (event.value){
      this.originalPropulsion = event.value;
      this.palmsService.selectedPropulsion.set(event.value)

      //ROBSON
      if (event.value.id === 1 || event.value.id === 2 ||
        event.value.id === 5 || event.value.id === 6){
        
        updatedTyres = this.updateTyresForRobsonPropulsion();
      } else {
        updatedTyres = this.updateTyresToEnabled();
      }

      //BB 250
      if (event.value.id === 3 || event.value.id === 4){
        
        updatedTyres = this.updateTyresForBB250Propulsion();
      } else {
        updatedTyres = this.updateTyresToEnabled();
      }
      
    } else {
      this.originalPropulsion = undefined;
      this.palmsService.selectedPropulsion.set(undefined);
      updatedTyres = this.updateTyresToEnabled();
    }

    this.tyres = updatedTyres;
  }

  updateTyresForRobsonPropulsion(): ConfigurationItem[] {
    return this.tyres.map((tyre) => ({
      ...tyre,
      disabledOption: tyre.code !== "WH3.6" 
      && tyre.code !== "WH5.6" 
      && tyre.code !== "WH8.8"
      && tyre.code !== "WH6.8"
      && tyre.code !== "WH7.8"
    }));
  }

  updateTyresForBB250Propulsion(): ConfigurationItem[] {
    return this.tyres.map((tyre) => ({
      ...tyre,
      disabledOption: tyre.code === "WH4.8" || tyre.code === "WH3.8" 
    }));
  }

  updateTyresToEnabled(): ConfigurationItem[] {
    return this.tyres.map((tyre) => ({
      ...tyre,
      disabledOption: false
    }));
  }

  handleDrawbarChange(event: ListboxChangeEvent) {
    const previousValue =  this.originalDrawbarPrice;
    this.originalDrawbarPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalDrawbarPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    let updatedOilPumps: ConfigurationItem[] = [];


    if (event.value){
      this.originalDrawbar = event.value;
      this.palmsService.selectedDrawbar.set(event.value)
      
      if (event.value.code === "C6") {
        updatedOilPumps = this.updateOilPumpsForDrawbars();
      } else {
        updatedOilPumps = this.updateOilPumpsTypesToEnabled();
      }

    } else {
      this.originalDrawbar = undefined;
      this.palmsService.selectedDrawbar.set(undefined)
      updatedOilPumps = this.updateOilPumpsTypesToEnabled();
    }

    this.oilPumps = updatedOilPumps;
  }

  updateOilPumpsForDrawbars(): ConfigurationItem[] {
    return this.oilPumps.map((oilPump) => ({
      ...oilPump,
      disabledOption: oilPump.code !== "P1" && oilPump.code !== "P2"
    }));
  }

  updateOilPumpsTypesToEnabled(): ConfigurationItem[] {
    return this.oilPumps.map((oilPump) => ({
      ...oilPump,
      disabledOption: false
    }));
  }

  handlePlatformChange(event: ListboxChangeEvent) {
    const previousValue = this.originalPlatformPrice;
    this.originalPlatformPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalPlatformPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalPlatform = event.value;
      this.palmsService.selectedPlatform.set(event.value);
    } else {
      this.originalPlatform = undefined;
      this.palmsService.selectedPlatform.set(undefined);
    }
  }

  handleOilPumpChange(event: ListboxChangeEvent) {
    const previousValue = this.originalOilPumpPrice;
    this.originalOilPumpPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalOilPumpPrice;
    const current = this.palmsService._trailerPrice();
  
    let updatedDrawbars: ConfigurationItem[] = [];

    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalOilPump = event.value;
      this.palmsService.selectedOilPump.set(event.value)

      // drawbars
      if (event.value.code === "P1" || event.value.code === "P2") {
        updatedDrawbars = this.updateDrawbarsToEnabled();
      } else {
        updatedDrawbars = this.updateDrawbarsForOilPumps();
      }

    } else {
      this.originalOilPump = undefined;
      this.palmsService.selectedOilPump.set(undefined)
      updatedDrawbars = this.updateDrawbarsToEnabled();
    }
    this.drawbars = updatedDrawbars;
  }

  updateDrawbarsForOilPumps(): ConfigurationItem[] {
    return this.drawbars.map((drawbar) => ({
      ...drawbar,
      disabledOption: drawbar.code === "C6"
    }));
  }

  updateDrawbarsToEnabled(): ConfigurationItem[] {
    return this.drawbars.map((drawbar) => ({
      ...drawbar,
      disabledOption: false
    }));
  }

  handleOilTankChange(event: ListboxChangeEvent) {
    const previousValue = this.originalOilTankPrice;
    this.originalOilTankPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalOilTankPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalOilTank = event.value;
      this.palmsService.selectedOilTank.set(event.value)
    } else {
      this.originalOilTank = undefined;
      this.palmsService.selectedOilTank.set(undefined)
    } 
  }

  handleSupportLegChange(event: ListboxChangeEvent) {
    const previousValue = this.originalSupportLegPrice;
    this.originalSupportLegPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalSupportLegPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalSupportLeg = event.value;
      this.palmsService.selectedSupportLeg.set(event.value)
    } else {
      this.originalSupportLeg = undefined;
      this.palmsService.selectedSupportLeg.set(undefined)
    }
  }

  handleLightChange(event: ListboxChangeEvent) {
    const previousValue = this.originalLightPrice;
    this.originalLightPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalLightPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalLight = event.value;
      this.palmsService.selectedTrailerLight.set(event.value)
    } else {
      this.originalLight = undefined;
      this.palmsService.selectedTrailerLight.set(undefined)
    }
  }

  handleTyreChange(event: ListboxChangeEvent) {
    const previousValue = this.originalTyrePrice;
    this.originalTyrePrice = event.value ? event.value.price : 0;
    const nextValue = this.originalTyrePrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    let updatedPropulsions: ConfigurationItem[] = [];

    if (event.value){
      this.originalTyre = event.value;
      this.palmsService.selectedTyre.set(event.value)

      if (event.value.code !== "WH3.6" && event.value.code !== "WH5.6" &&
      event.value.code !== "WH8.8" && event.value.code !== "WH6.8" && event.value.code !== "WH7.8") {  
        updatedPropulsions = this.updatePropulsionsForTyre();
      } else {
        updatedPropulsions = this.updatePropulsionsToEnabled();
      }
    } else {
      this.originalTyre = undefined;
      this.palmsService.selectedTyre.set(undefined);
      updatedPropulsions = this.updatePropulsionsToEnabled();
    }

    this.propulsions = updatedPropulsions;
  }

  updatePropulsionsForTyre(): ConfigurationItem[] {
    return this.propulsions.map((propulsion) => ({
      ...propulsion,
      disabledOption: propulsion.id === 1 || propulsion.id === 2 
      || propulsion.id === 5 || propulsion.id === 6
    }));
  }

  updatePropulsionsToEnabled(): ConfigurationItem[] {
    return this.propulsions.map((propulsion) => ({
      ...propulsion,
      disabledOption: false
    }));
  }

  onOilCoolerChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalTrailerOilCoolerPrice = Number(event.checked[0].price);
      this.originalTrailerOilCooler = event.checked[0];
      this.palmsService.selectedTrailerOilCooler.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalTrailerOilCoolerPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalTrailerOilCooler = undefined;
      this.palmsService.selectedTrailerOilCooler.set(undefined);
    }
  }

  onBolsterLockChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBolsterLockPrice = Number(event.checked[0].price);
      this.originalBolsterLock = event.checked[0];
      this.palmsService.selectedBolsterLock.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalBolsterLockPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBolsterLock = undefined;
      this.palmsService.selectedBolsterLock.set(undefined);
    }
  }

  onBBoxChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice(); 
      const newPrice = Number(current) + Number(event.checked[0].price);   
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBboxPrice = Number(event.checked[0].price);
      this.originalBbox = event.checked[0];
      this.palmsService.selectedBBox.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalBboxPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBbox = undefined;
      this.palmsService.selectedBBox.set(undefined);
    }
  }

  onWoodSorterChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
        this.originalWoodSorterPrice = Number(event.checked[0].price);
        this.woodSorterChecked = true;
        this.originalWoodSorter = event.checked[0];
        
        this.palmsService.selectedWoodSorter.set(event.checked[0]);
        setTimeout(() => {
          if(this.woodSorterArrayElements?.length === 0){
            const maxNumber = Number(this.originalStanchion?.code![1]) * 2;

            this.woodSorterArrayElements = [];
            for (let i = 1; i <= maxNumber; i++) {
              this.woodSorterArrayElements.push({number: i});
              if (this.originalWoodSorter){
                this.originalWoodSorter.name = this.originalWoodSorter?.name.replace(/\s\d+ db$/, '');
                this.originalWoodSorter.price = 0;
                this.palmsService._trailerPrice.update(value => Number(value) + (Number(65)* Number(this.initialWoodSorterNumber)));
              }
            }
          }
        }, 100);
    } else {
        setTimeout(() => {
          this.palmsService._trailerPrice.update(value => value - (Number(65)* Number(this.initialWoodSorterNumber)));
          this.woodSorterChecked = false;
          this.initialWoodSorterNumber = 0;
          this.previousWoodSorterNumber = 0;
          this.originalWoodSorter = undefined;
          this.woodSorterArrayElements = []
          this.palmsService.selectedWoodSorter.set(undefined);
          }, 50);
    }
  }

  onWoodSorterNumberChange(event: DropdownChangeEvent){
    this.woodSorterNumberSelected = true;
    const number = Number(event.value.number);
    this.initialWoodSorterNumber = number;
    const previousTotalPrice = Number(this.previousWoodSorterNumber) * Number(this.initialWoodSorterPrice);

    if (this.originalWoodSorter) {
        this.originalWoodSorter.name = this.originalWoodSorter.name.replace(/\s\d+ db$/, '') + " " + this.initialWoodSorterNumber + " db";
        this.originalWoodSorter.price = this.initialWoodSorterPrice * this.initialWoodSorterNumber;

        this.palmsService._trailerPrice.update(value => value - previousTotalPrice + (Number(this.initialWoodSorterPrice) * Number(this.initialWoodSorterNumber)));
    } else {
      this.palmsService._trailerPrice.update(value => value + previousTotalPrice + (Number(this.initialWoodSorterPrice) * Number(this.initialWoodSorterNumber)));
    }
    this.previousWoodSorterNumber = number;
  }

  onHandBrakeChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalHandBrakePrice = Number(event.checked[0].price);
      this.originalHandBrake = event.checked[0];
      this.palmsService.selectedHandBrake.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalHandBrakePrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalHandBrake = undefined;
      this.palmsService.selectedHandBrake.set(undefined);
    }
  }

  onChainsawHolderChange(event: CheckboxChangeEvent) {
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalChainsawHolderPrice = Number(event.checked[0].price);
      this.originalChainsawHolder = event.checked[0];
      this.palmsService.selectedChainsawHolder.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalChainsawHolderPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalChainsawHolder = undefined;
      this.palmsService.selectedChainsawHolder.set(undefined);
    }
  }

  onUnderrunProtectionChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalUnderrunProtectionPrice = Number(event.checked[0].price);
      this.originalUnderrunProtection = event.checked[0];
      this.palmsService.selectedUnderrunProtection.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalUnderrunProtectionPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalUnderrunProtection = undefined;
      this.palmsService.selectedUnderrunProtection.set(undefined);
    }
  }

  onBunkAdapterChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
        this.originalBunkAdapterPrice = Number(event.checked[0].price);
        this.bunkAdapterChecked = true;
        this.originalBunkAdapter = event.checked[0];
        this.palmsService.selectedBunkAdapter.set(event.checked[0]);
        setTimeout(() => {
          if(this.bunkAdapterArrayElements?.length === 0){
            const maxNumber = Number(this.originalStanchion?.code![1]) * 2;

            this.bunkAdapterArrayElements = [];
            for (let i = 1; i <= maxNumber; i++) {
              this.bunkAdapterArrayElements.push({number: i});
              if (this.originalBunkAdapter){
                this.originalBunkAdapter.name = this.originalBunkAdapter?.name.replace(/\s\d+ db$/, '');
                this.originalBunkAdapter.price = 0;
                this.palmsService._trailerPrice.update(value => Number(value) + (Number(this.initialBunkAdapterPrice) * Number(this.initialBunkAdapterNumber)));
              }
            }
          }
        }, 100);
    } else {
        setTimeout(() => {
          this.palmsService._trailerPrice.update(value => value - (Number(this.initialBunkAdapterPrice) * Number(this.initialBunkAdapterNumber)));
          this.bunkAdapterChecked = false;
          this.initialBunkAdapterNumber = 0;
          this.previousBunkAdapterNumber = 0;
          this.originalBunkAdapter = undefined;
          this.bunkAdapterArrayElements = []
          this.palmsService.selectedBunkAdapter.set(undefined);
          }, 50);
    }
  }

  onBunkAdapterNumberChange(event: DropdownChangeEvent){
    this.bunkAdapterNumberSelected = true;
    const number = Number(event.value.number);
    this.initialBunkAdapterNumber = number;
    const previousTotalPrice = Number(this.previousBunkAdapterNumber) * Number(this.initialBunkAdapterPrice);

    if (this.originalBunkAdapter) {
        this.originalBunkAdapter.name = this.originalBunkAdapter.name.replace(/\s\d+ db$/, '') + " " + this.initialBunkAdapterNumber + " db";
        this.originalBunkAdapter.price = this.initialBunkAdapterPrice * this.initialBunkAdapterNumber;

        this.palmsService._trailerPrice.update(value => value - previousTotalPrice + (Number(this.initialBunkAdapterPrice) * Number(this.initialBunkAdapterNumber)));
    } else {
      this.palmsService._trailerPrice.update(value => value + previousTotalPrice + (Number(this.initialBunkAdapterPrice) * Number(this.initialBunkAdapterNumber)));
    }
    this.previousBunkAdapterNumber = number;
  }

  onBunkExtensionChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
        this.originalBunkExtensionPrice = Number(event.checked[0].price);
        this.bunkExtensionChecked = true;
        this.originalBunkExtension = event.checked[0];
        this.palmsService.selectedBunkExtension.set(event.checked[0]);
        setTimeout(() => {
          if(this.bunkExtensionArrayElements?.length === 0){
            const maxNumber = Number(this.originalStanchion?.code![1]) * 2;

            this.bunkExtensionArrayElements = [];
            for (let i = 1; i <= maxNumber; i++) {
              this.bunkExtensionArrayElements.push({number: i});
              if (this.originalBunkExtension){
                this.originalBunkExtension.name = this.originalBunkExtension?.name.replace(/\s\d+ db$/, '');
                this.originalBunkExtension.price = 0;
                this.palmsService._trailerPrice.update(value => Number(value) + (Number(this.initialBunkExtensionPrice) * Number(this.initialBunkExtensionNumber)));
              }
            }
          }
        }, 100);
    } else {
        setTimeout(() => {
          this.palmsService._trailerPrice.update(value => value - (Number(this.initialBunkExtensionPrice) * Number(this.initialBunkExtensionNumber)));
          this.bunkExtensionChecked = false;
          this.initialBunkExtensionNumber = 0;
          this.previousBunkExtensionNumber = 0;
          this.originalBunkExtension = undefined;
          this.bunkExtensionArrayElements = []
          this.palmsService.selectedBunkExtension.set(undefined);
          }, 50);
    }
  }

  onBunkExtensionNumberChange(event: DropdownChangeEvent){
    this.bunkExtensionNumberSelected = true;
    const number = Number(event.value.number);
    this.initialBunkExtensionNumber = number;
    const previousTotalPrice = Number(this.previousBunkExtensionNumber) * Number(this.initialBunkExtensionPrice);

    if (this.originalBunkExtension) {
        this.originalBunkExtension.name = this.originalBunkExtension.name.replace(/\s\d+ db$/, '') + " " + this.initialBunkExtensionNumber + " db";
        this.originalBunkExtension.price = this.initialBunkExtensionPrice * this.initialBunkExtensionNumber;

        this.palmsService._trailerPrice.update(value => value - previousTotalPrice + (Number(this.initialBunkExtensionPrice) * Number(this.initialBunkExtensionNumber)));
    } else {
      this.palmsService._trailerPrice.update(value => value + previousTotalPrice + (Number(this.initialBunkExtensionPrice) * Number(this.initialBunkExtensionNumber)));
    }
    this.previousBunkExtensionNumber = number;
  }

  onFrameExtensionChange(event: CheckboxChangeEvent) {
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalFrameExtensionPrice = Number(event.checked[0].price);
      this.originalFrameExtension = event.checked[0];
      this.palmsService.selectedFrameExtension.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalFrameExtensionPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalFrameExtension = undefined;
      this.palmsService.selectedFrameExtension.set(undefined);
    }
  }

  onStanchionExtensionChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
        this.originalStanchionExtensionPrice = Number(event.checked[0].price);
        this.stanchionExtensionChecked = true;
        this.originalStanchionExtension = event.checked[0];

        this.palmsService.selectedStanchionExtension.set(event.checked[0]);
        setTimeout(() => {
          if(this.stanchionExtensionArrayElements?.length === 0){
            const maxNumber = Number(this.originalStanchion?.code![1]) * 2;

            this.stanchionExtensionArrayElements = [];
            for (let i = 1; i <= maxNumber; i++) {
              this.stanchionExtensionArrayElements.push({number: i});
              if (this.originalStanchionExtension){
                this.originalStanchionExtension.name = this.originalStanchionExtension?.name.replace(/\s\d+ db$/, '');
                this.originalStanchionExtension.price = 0;
                this.palmsService._trailerPrice.update(value => Number(value) + (Number(this.initialStanchionExtensionPrice) * Number(this.initialStanchionExtensionNumber)));
              }
            }
          }
        }, 100);
    } else {
        setTimeout(() => {
          this.palmsService._trailerPrice.update(value => value - (Number(this.initialStanchionExtensionPrice) * Number(this.initialStanchionExtensionNumber)));
          this.stanchionExtensionChecked = false;
          this.initialStanchionExtensionNumber = 0;
          this.previousStanchionExtensionNumber = 0;
          this.originalStanchionExtension = undefined;
          this.stanchionExtensionArrayElements = []
          this.palmsService.selectedStanchionExtension.set(undefined);
          }, 50);
    }
  }

  onStanchionExtensionNumberChange(event: DropdownChangeEvent){
    this.stanchionExtensionNumberSelected = true;
    const number = Number(event.value.number);
    this.initialStanchionExtensionNumber = number;
    const previousTotalPrice = Number(this.previousStanchionExtensionNumber) * Number(this.initialStanchionExtensionPrice);

    if (this.originalStanchionExtension) {
        this.originalStanchionExtension.name = this.originalStanchionExtension.name.replace(/\s\d+ db$/, '') + " " + this.initialStanchionExtensionNumber + " db";
        this.originalStanchionExtension.price = this.initialStanchionExtensionPrice * this.initialStanchionExtensionNumber;

        this.palmsService._trailerPrice.update(value => value - previousTotalPrice + (Number(this.initialStanchionExtensionPrice) * Number(this.initialStanchionExtensionNumber)));
    } else {
      this.palmsService._trailerPrice.update(value => value + previousTotalPrice + (Number(this.initialStanchionExtensionPrice) * Number(this.initialStanchionExtensionNumber)));
    }
    this.previousStanchionExtensionNumber = number;
  }

  onHydroPackChange(event: CheckboxChangeEvent) {
    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalHydroPackPrice = Number(event.checked[0].price);
      this.originalHydroPack = event.checked[0];
      this.palmsService.selectedHydroPack.set(event.checked[0]);
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = Number(current) - this.originalHydroPackPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalHydroPack = undefined;
      this.palmsService.selectedHydroPack.set(undefined);
    }
  }

  navigateToCrane(craneId: number){
    const url = `/calculator/palms/cranes/${craneId}`;
    window.open(url, '_blank');
  }

  toggleDialog(dialogType: string, show: boolean) {
    switch (dialogType) {
        case 'brakes':
          this.showBrakesDialog = show;
          break;
        case 'propulsions':
          this.showPropulsionsDialog = show;
          break;
        case 'drawbars':
          this.showDrawbarsDialog = show;
          break; 
        case 'platforms':
          this.showPlatformsDialog = show;
          break;  
        case 'oilPumps':
          this.showOilPumpsDialog = show;
          break; 
        case 'oilTanks':
          this.showOilTanksDialog = show;
          break;  
        case 'trailerOilCooler':
          this.showTrailerOilCoolerDialog = show;
          break;
        case 'bolsterLock':
          this.showBolsterLockDialog = show;
          break;
        case 'bbox':
          this.showBboxDialog = show;
          break; 
        case 'woodSorter':
          this.showWoodSorterDialog = show;
          break; 
        case 'handBrake':
          this.showHandBrakeDialog = show;
          break; 
        case 'chainsawHolder':
          this.showChainsawHolderDialog = show;
          break;
        case 'underrunProtection':
          this.showUnderrunProtectionDialog = show;
          break;  
        case 'supportLeg':
          this.showSupportLegDialog = show;
          break; 
        case 'lights':
          this.showLightsDialog = show;
          break;     
        case 'tyres':
          this.showTyresDialog = show;
          break;   
        case 'bunkAdapter':
          this.showBunkAdapterDialog = show;
          break;   
        case 'bunkExtension':
          this.showBunkExtensionDialog = show;
          break;   
        case 'frameExtension':
          this.showFrameExtensionDialog = show;
          break;   
        default:
          break;
      }
  }

  selectCrane(crane: PalmsCraneOverview){
    this.palmsService._selectedCrane.next(crane);
  }

  delete() {
    this.trailerFormGroup.reset();
    this.trailerSelected = false;
    this.originalStanchion = undefined;
    this.originalStanchionPrice = 0;
    this.originalBrake = undefined;
    this.originalBrakePrice = 0;
    this.originalPropulsion = undefined;
    this.originalPropulsionPrice = 0;
    this.originalDrawbar = undefined;
    this.originalDrawbarPrice = 0;
    this.originalPlatform = undefined;
    this.originalPlatformPrice = 0;
    this.originalOilPump = undefined;
    this.originalOilPumpPrice = 0;
    this.originalOilTank = undefined; 
    this.originalOilTankPrice = 0;
    this.originalTrailerOilCooler = undefined;
    this.originalTrailerOilCoolerPrice = 0
    this.originalBolsterLock = undefined; 
    this.originalBolsterLockPrice = 0;
    this.originalBbox = undefined; 
    this.originalBboxPrice = 0;
    this.originalWoodSorter = undefined;
    this.originalWoodSorterPrice = 0;
    this.originalHandBrake = undefined;  
    this.originalHandBrakePrice = 0;
    this.originalChainsawHolder = undefined; 
    this.originalChainsawHolderPrice = 0;
    this.originalUnderrunProtection = undefined;
    this.originalUnderrunProtectionPrice = 0;
    this.originalSupportLeg = undefined;
    this.originalSupportLegPrice = 0;
    this.originalLight = undefined;
    this.originalLightPrice = 0;
    this.originalTyre = undefined; 
    this.originalTyrePrice = 0;
    this.originalBunkAdapter = undefined;
    this.originalBunkAdapterPrice = 0;
    this.originalBunkExtension = undefined;
    this.originalBunkExtensionPrice = 0;
    this.originalFrameExtension = undefined;
    this.originalFrameExtensionPrice = 0;
    
    this.woodSorterChecked = false;
    this.woodSorterNumberSelected = false;
    this.woodSorterArrayElements = [];
    this.initialWoodSorterNumber = 0;
    this.previousWoodSorterNumber = 0;

    this.bunkAdapterChecked = false;
    this.bunkAdapterNumberSelected = false;
    this.bunkAdapterArrayElements = [];
    this.initialBunkAdapterNumber = 0;
    this.previousBunkAdapterNumber = 0;

    this.bunkExtensionChecked = false;
    this.bunkExtensionNumberSelected = false;
    this.bunkExtensionArrayElements = [];
    this.initialBunkExtensionNumber = 0;
    this.previousBunkExtensionNumber = 0;
  }
}