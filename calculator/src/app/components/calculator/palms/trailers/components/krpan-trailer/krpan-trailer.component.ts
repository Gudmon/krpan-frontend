import { KrpanCraneOverview } from '../../../cranes/models/krpan-crane-overview';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { KrpanTrailerConfigService } from '../../services/krpan-trailer-config.service';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { Subject, forkJoin, takeUntil } from 'rxjs';
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
import { KrpanTrailerCalculatorHintsComponent } from '../krpan-trailer-calculator-hints/krpan-trailer-calculator-hints.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { CardModule } from 'primeng/card';
import { KrpanTrailer } from '../../models/krpan-trailer';
import { KrpanTrailerInformationComponent } from "../krpan-trailer-information/krpan-trailer-information.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { PropulsionsDialogComponent } from "../dialogs/propulsions-dialog/propulsions-dialog.component";
import { BunkAdapterDialogComponent } from "../dialogs/bunk-adapter-dialog/bunk-adapter-dialog.component";
import { BunkExtensionDialogComponent } from "../dialogs/bunk-extension-dialog/bunk-extension-dialog.component";
import { FrameExtensionDialogComponent } from "../dialogs/frame-extension-dialog/frame-extension-dialog.component";
import { KrpanCraneComponent } from '../../../cranes/components/krpan-crane/krpan-crane.component';
import { KrpanCraneCardsComponent } from '../../../cranes/components/krpan-crane-cards/krpan-crane-cards.component';
import { KrpanTrailerCardsComponent } from '../krpan-trailer-cards/krpan-trailer-cards.component';
import { KrpanService } from '../../../shared/services/krpan.service';

@Component({
    selector: 'app-krpan-trailer',
    standalone: true,
    templateUrl: './krpan-trailer.component.html',
    styleUrl: './krpan-trailer.component.css',
    imports: [NavigationComponent, CardModule, FooterComponent, RadioButtonModule, KrpanCraneCardsComponent, TrailerDataItemComponent, AccordionModule, DividerModule, DropdownModule, InputSwitchModule, GalleriaModule, FormsModule, ReactiveFormsModule, ButtonModule, ImageModule, ListboxModule, FormatPricePipe, BrakesDialogComponent, DrawbarDialogComponent, PlatormDialogComponent, OilPumpDialogComponent, OilTankDialogComponent, CheckboxModule, OilTankCoolerDialogComponent, BolsterLockDialogComponent, BboxDialogComponent, WoodsorterDialogComponent, ChainsawHolderDialogComponent, UnderrunProtectionDialogComponent, SupportLegDialogComponent, TrailerLightDialogComponent, TyresDialogComponent, KrpanTrailerCalculatorHintsComponent, AccessoryItemComponent, KrpanTrailerInformationComponent, KrpanTrailerCardsComponent, KrpanCraneComponent, PropulsionsDialogComponent, BunkAdapterDialogComponent, BunkExtensionDialogComponent, FrameExtensionDialogComponent]
})
export class KrpanTrailerComponent implements OnInit, OnDestroy{
  @Input() trailer!: KrpanTrailer
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

  tyres: ConfigurationItem[] = [];
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
  bunkAdapter: ConfigurationItem | undefined = undefined;
  bunkExtension: ConfigurationItem | undefined = undefined;
  frameExtension: ConfigurationItem | undefined = undefined;
  trailerShipping: ConfigurationItem | undefined = undefined;
  MOT: ConfigurationItem | undefined = undefined;
  stanchionExtension: ConfigurationItem | undefined = undefined;
  hydroPack: ConfigurationItem | undefined = undefined;

  selectedConfigurationItems: ConfigurationItem[] = [];

  originalTyrePrice = 0;
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
  originalBunkAdapterPrice = 0;
  originalBunkExtensionPrice = 0;
  originalFrameExtensionPrice = 0;
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

  originalTyre: ConfigurationItem | undefined = undefined;
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
  originalBunkAdapter: ConfigurationItem | undefined = undefined;
  bunkAdapterArrayElements: any[] | undefined = [];
  originalBunkExtension: ConfigurationItem | undefined = undefined;
  bunkExtensionArrayElements: any[] | undefined = [];
  originalFrameExtension: ConfigurationItem | undefined = undefined;
  originalShipping: ConfigurationItem | undefined = undefined;
  originalMOT: ConfigurationItem | undefined = undefined;
  stanchionExtensionArrayElements: any[] | undefined = [];
  originalHydroPack: ConfigurationItem | undefined = undefined;

  trailerFormGroup: FormGroup = new FormGroup({
    selectedTrailer: new FormControl<string>(''),
    selectedTyre: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
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
    selectedBunkAdapter: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBunkExtension: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedFrameExtension: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedShipping: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedMOT: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedHydroPack: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
  });

  private initializeFormGroup(): void {
    
    this.trailerFormGroup = this.fb.group({
      selectedTrailer: [this.trailer.name],
      selectedTyre: [this.tyres[0]],
      selectedBrake: [this.brakes[0]],
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
    readonly krpanService: KrpanService,
    private krpanTrailerConfigService: KrpanTrailerConfigService,
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
    this.krpanService.getTrailer(this.id).pipe().subscribe((response) => {
      if(!this.fromCrane){
        this.krpanService._deleteTrailer.next(true);
        this.krpanService._deleteCrane.next(true);
        this.krpanService._trailerSelected.next(false);
        this.krpanService._craneSelected.next(false);
        this.krpanService._selectedTrailer.next(undefined);
        this.krpanService._selectedCrane.next(undefined);
        this.krpanService._selectedTrailer.next(response); 
      }
     
      this.trailer = response as KrpanTrailer;
      
    }).add(() => {
      this.loadingService.disableLoader();
    })
    
    if(this.fromCrane){
      this.krpanService.selectedTrailer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((trailer) => {
        this.id = trailer?.id;
        this.loadTrailerConfigurations(this.id!);
        this.krpanService._selectedAccordion.set(1);
      });
    }
    else {
      this.krpanService._selectedAccordion.set(0);
      this.krpanService.deleteCrane();
      this.krpanService.deleteTrailer();
    }

    this.krpanService.deleteTrailer$.subscribe(() => {
      this.delete();
    })
  }

  getTrailerName(){
    return this.krpanService._selectedTrailer.value?.name
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCranes(){
    const craneNames = this.trailer.krpanCrane.map((krpanCrane) => krpanCrane.name);
    return craneNames;
  }

  loadTrailerConfigurations(id: number){ 
    if(id){
      this.loadingService.enableLoader();;
      const tyres$ = this.krpanTrailerConfigService.getTyres(id);
      const brakes$ = this.krpanTrailerConfigService.getBrakes(id);
      
      const request = forkJoin([tyres$, brakes$]);
     
      request.subscribe(([tyres, brakes]) => {
        
        if (tyres.length > 0){
          this.tyres = tyres;
          this.krpanService.selectedTyre.set(tyres[0])
        }

        if (brakes.length > 0){
          this.brakes = brakes;
          this.krpanService.selectedBrake.set(brakes[0])
        }

        this.krpanService._trailerPrice.set(Number(this.trailer.price));
        this.trailerSelected = true;
        this.initializeFormGroup();
    } 
    
    ).add(() => {
      this.loadingService.disableLoader();
      this.krpanService._trailerSelected.next(true);
    })};
  }

  handleTyreChange(event: ListboxChangeEvent) {
    const previousValue = this.originalTyrePrice;
    this.originalTyrePrice = event.value ? event.value.price : 0;
    const nextValue = this.originalTyrePrice;
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    let updatedPropulsions: ConfigurationItem[] = [];

    if (event.value){
      this.originalTyre = event.value;
      this.krpanService.selectedTyre.set(event.value)

      if (event.value.code !== "WH3.6" && event.value.code !== "WH5.6" &&
      event.value.code !== "WH8.8" && event.value.code !== "WH6.8" && event.value.code !== "WH7.8") {  
        updatedPropulsions = this.updatePropulsionsForTyre();
      } else {
        updatedPropulsions = this.updatePropulsionsToEnabled();
      }
    } else {
      this.originalTyre = undefined;
      this.krpanService.selectedTyre.set(undefined);
      updatedPropulsions = this.updatePropulsionsToEnabled();
    }

    this.propulsions = updatedPropulsions;
  }

  handleBrakeChange(event: ListboxChangeEvent) {
    const previousValue = this.originalBrakePrice;
    this.originalBrakePrice = event.value ? event.value.price : 0;
    const nextValue = this.originalBrakePrice;
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalBrake = event.value;
      this.krpanService.selectedBrake.set(event.value)
    } else {
      this.originalBrake = undefined;
      this.krpanService.selectedBrake.set(undefined)
    }
  }

  handlePropulsionChange(event: ListboxChangeEvent) {
    const previousValue = this.originalPropulsionPrice
    this.originalPropulsionPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalPropulsionPrice;
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    let updatedTyres: ConfigurationItem[] = [];

    if (event.value){
      this.originalPropulsion = event.value;
      this.krpanService.selectedPropulsion.set(event.value)

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
      this.krpanService.selectedPropulsion.set(undefined);
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
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    let updatedOilPumps: ConfigurationItem[] = [];


    if (event.value){
      this.originalDrawbar = event.value;
      this.krpanService.selectedDrawbar.set(event.value)
      
      if (event.value.code === "C6") {
        updatedOilPumps = this.updateOilPumpsForDrawbars();
      } else {
        updatedOilPumps = this.updateOilPumpsTypesToEnabled();
      }

    } else {
      this.originalDrawbar = undefined;
      this.krpanService.selectedDrawbar.set(undefined)
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
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalPlatform = event.value;
      this.krpanService.selectedPlatform.set(event.value);
    } else {
      this.originalPlatform = undefined;
      this.krpanService.selectedPlatform.set(undefined);
    }
  }

  handleOilPumpChange(event: ListboxChangeEvent) {
    const previousValue = this.originalOilPumpPrice;
    this.originalOilPumpPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalOilPumpPrice;
    const current = this.krpanService._trailerPrice();
  
    let updatedDrawbars: ConfigurationItem[] = [];

    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalOilPump = event.value;
      this.krpanService.selectedOilPump.set(event.value)

      // drawbars
      if (event.value.code === "P1" || event.value.code === "P2") {
        updatedDrawbars = this.updateDrawbarsToEnabled();
      } else {
        updatedDrawbars = this.updateDrawbarsForOilPumps();
      }

    } else {
      this.originalOilPump = undefined;
      this.krpanService.selectedOilPump.set(undefined)
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
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalOilTank = event.value;
      this.krpanService.selectedOilTank.set(event.value)
    } else {
      this.originalOilTank = undefined;
      this.krpanService.selectedOilTank.set(undefined)
    } 
  }

  handleSupportLegChange(event: ListboxChangeEvent) {
    const previousValue = this.originalSupportLegPrice;
    this.originalSupportLegPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalSupportLegPrice;
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalSupportLeg = event.value;
      this.krpanService.selectedSupportLeg.set(event.value)
    } else {
      this.originalSupportLeg = undefined;
      this.krpanService.selectedSupportLeg.set(undefined)
    }
  }

  handleLightChange(event: ListboxChangeEvent) {
    const previousValue = this.originalLightPrice;
    this.originalLightPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalLightPrice;
    const current = this.krpanService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.krpanService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalLight = event.value;
      this.krpanService.selectedTrailerLight.set(event.value)
    } else {
      this.originalLight = undefined;
      this.krpanService.selectedTrailerLight.set(undefined)
    }
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
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.krpanService._trailerPrice.set(newPrice);
      this.originalTrailerOilCoolerPrice = Number(event.checked[0].price);
      this.originalTrailerOilCooler = event.checked[0];
      this.krpanService.selectedTrailerOilCooler.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalTrailerOilCoolerPrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalTrailerOilCooler = undefined;
      this.krpanService.selectedTrailerOilCooler.set(undefined);
    }
  }

  onBolsterLockChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.krpanService._trailerPrice.set(newPrice);
      this.originalBolsterLockPrice = Number(event.checked[0].price);
      this.originalBolsterLock = event.checked[0];
      this.krpanService.selectedBolsterLock.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalBolsterLockPrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalBolsterLock = undefined;
      this.krpanService.selectedBolsterLock.set(undefined);
    }
  }

  onBBoxChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.krpanService._trailerPrice(); 
      const newPrice = Number(current) + Number(event.checked[0].price);   
      this.krpanService._trailerPrice.set(newPrice);
      this.originalBboxPrice = Number(event.checked[0].price);
      this.originalBbox = event.checked[0];
      this.krpanService.selectedBBox.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalBboxPrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalBbox = undefined;
      this.krpanService.selectedBBox.set(undefined);
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

        this.krpanService._trailerPrice.update(value => value - previousTotalPrice + (Number(this.initialWoodSorterPrice) * Number(this.initialWoodSorterNumber)));
    } else {
      this.krpanService._trailerPrice.update(value => value + previousTotalPrice + (Number(this.initialWoodSorterPrice) * Number(this.initialWoodSorterNumber)));
    }
    this.previousWoodSorterNumber = number;
  }

  onHandBrakeChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.krpanService._trailerPrice.set(newPrice);
      this.originalHandBrakePrice = Number(event.checked[0].price);
      this.originalHandBrake = event.checked[0];
      this.krpanService.selectedHandBrake.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalHandBrakePrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalHandBrake = undefined;
      this.krpanService.selectedHandBrake.set(undefined);
    }
  }

  onChainsawHolderChange(event: CheckboxChangeEvent) {
    if (event.checked.length > 0) {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.krpanService._trailerPrice.set(newPrice);
      this.originalChainsawHolderPrice = Number(event.checked[0].price);
      this.originalChainsawHolder = event.checked[0];
      this.krpanService.selectedChainsawHolder.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalChainsawHolderPrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalChainsawHolder = undefined;
      this.krpanService.selectedChainsawHolder.set(undefined);
    }
  }

  onUnderrunProtectionChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0) {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.krpanService._trailerPrice.set(newPrice);
      this.originalUnderrunProtectionPrice = Number(event.checked[0].price);
      this.originalUnderrunProtection = event.checked[0];
      this.krpanService.selectedUnderrunProtection.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalUnderrunProtectionPrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalUnderrunProtection = undefined;
      this.krpanService.selectedUnderrunProtection.set(undefined);
    }
  }

  onFrameExtensionChange(event: CheckboxChangeEvent) {
    if (event.checked.length > 0) {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.krpanService._trailerPrice.set(newPrice);
      this.originalFrameExtensionPrice = Number(event.checked[0].price);
      this.originalFrameExtension = event.checked[0];
      this.krpanService.selectedFrameExtension.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalFrameExtensionPrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalFrameExtension = undefined;
      this.krpanService.selectedFrameExtension.set(undefined);
    }
  }


  onHydroPackChange(event: CheckboxChangeEvent) {
    if (event.checked.length > 0) {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) + Number(event.checked[0].price);
      this.krpanService._trailerPrice.set(newPrice);
      this.originalHydroPackPrice = Number(event.checked[0].price);
      this.originalHydroPack = event.checked[0];
      this.krpanService.selectedHydroPack.set(event.checked[0]);
    } else {
      const current = this.krpanService._trailerPrice();
      const newPrice = Number(current) - this.originalHydroPackPrice;
      this.krpanService._trailerPrice.set(newPrice);
      this.originalHydroPack = undefined;
      this.krpanService.selectedHydroPack.set(undefined);
    }
  }

  navigateToCrane(craneId: number){
    const url = `/calculator/krpan/cranes/${craneId}`;
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

  selectCrane(crane: KrpanCraneOverview){
    this.krpanService._selectedCrane.next(crane);
  }

  delete() {
    this.trailerFormGroup.reset();
    this.trailerSelected = false;
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