import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { PalmsCraneInformationComponent } from "../palms-crane-information/palms-crane-information.component";
import { PalmsService } from '../../../shared/services/palms.service';
import { LoadingService } from '../../../../../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PalmsCrane } from '../../models/palms-crane';
import { CommonModule } from '@angular/common';
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { PalmsCraneConfigService } from '../../services/palms-crane-config.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { FrameType } from '../../models/frame-type';
import { FrameTypesDialogComponent } from '../dialogs/frame-types-dialog/frame-types-dialog.component';
import { ControlBlocksDialogComponent } from "../dialogs/control-blocks-dialog/control-blocks-dialog.component";
import { Dropdown } from 'primeng/dropdown';
import { RotatorsDialogComponent } from "../dialogs/rotators-dialog/rotators-dialog.component";
import { GrapplesDialogComponent } from "../dialogs/grapples-dialog/grapples-dialog.component";
import { WinchesDialogComponent } from "../dialogs/winches-dialog/winches-dialog.component";
import { Checkbox, CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ProtectionSleevesDialogComponent } from "../dialogs/protection-sleeves-dialog/protection-sleeves-dialog.component";
import { ElectricalFloatingDialogComponent } from "../dialogs/electrical-floating-dialog/electrical-floating-dialog.component";
import { ValveBlockDialogComponent } from "../dialogs/valve-block-dialog/valve-block-dialog.component";
import { DampingsDialogComponent } from "../dialogs/dampings-dialog/dampings-dialog.component";
import { CraneLightDialogComponent } from "../dialogs/crane-light-dialog/crane-light-dialog.component";
import { OperatorSeatDialogComponent } from "../dialogs/operator-seat-dialog/operator-seat-dialog.component";
import { CraneOilcoolerDialogComponent } from "../dialogs/crane-oilcooler-dialog/crane-oilcooler-dialog.component";
import { RotatorBrakesDialogComponent } from "../dialogs/rotator-brakes-dialog/rotator-brakes-dialog.component";
import { JoystickHolderDialogComponent } from "../dialogs/joystick-holder-dialog/joystick-holder-dialog.component";
import { HoseGuardsDialogComponent } from "../dialogs/hose-guards-dialog/hose-guards-dialog.component";
import { TurningCounterPlateDialogComponent } from "../dialogs/turning-counter-plate-dialog/turning-counter-plate-dialog.component";
import { SupportCounterPlateDialogComponent } from "../dialogs/support-counter-plate-dialog/support-counter-plate-dialog.component";
import { BoomguardDialogComponent } from "../dialogs/boomguard-dialog/boomguard-dialog.component";
import { CoverDialogComponent } from "../dialogs/cover-dialog/cover-dialog.component";
import { WoodcontrolDialogComponent } from "../dialogs/woodcontrol-dialog/woodcontrol-dialog.component";
import { LinkageDialogComponent } from "../dialogs/linkage-dialog/linkage-dialog.component";
import { PalmsTrailerComponent } from "../../../trailers/components/palms-trailer/palms-trailer.component";
import { PalmsTrailerCardsComponent } from "../../../trailers/components/palms-trailer-cards/palms-trailer-cards.component";
import { PalmsTrailerOverview } from '../../../trailers/models/palms-trailer-overview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PalmsCraneCalculatorHintsComponent } from "../palms-crane-calculator-hints/palms-crane-calculator-hints.component";
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
    selector: 'app-palms-crane',
    standalone: true,
    templateUrl: './palms-crane.component.html',
    styleUrl: './palms-crane.component.css',
    imports: [FormsModule, InputSwitchModule, ReactiveFormsModule, AccordionModule, RadioButtonModule, CheckboxModule, NavigationComponent, FooterComponent, PalmsCraneInformationComponent, CommonModule, ListboxModule, AccessoryItemComponent, FormatPricePipe, FrameTypesDialogComponent, ControlBlocksDialogComponent, RotatorsDialogComponent, GrapplesDialogComponent, WinchesDialogComponent, ProtectionSleevesDialogComponent, ElectricalFloatingDialogComponent, ValveBlockDialogComponent, DampingsDialogComponent, CraneLightDialogComponent, OperatorSeatDialogComponent, CraneOilcoolerDialogComponent, RotatorBrakesDialogComponent, JoystickHolderDialogComponent, HoseGuardsDialogComponent, TurningCounterPlateDialogComponent, SupportCounterPlateDialogComponent, BoomguardDialogComponent, CoverDialogComponent, WoodcontrolDialogComponent, LinkageDialogComponent, PalmsTrailerComponent, PalmsTrailerCardsComponent, PalmsCraneCalculatorHintsComponent]
})
export class PalmsCraneComponent implements OnInit, OnDestroy {
    crane!: PalmsCrane

    @Input() id?: number;
    availableCoverCodes: string[] = ["A2", "A7", "A12", "A14"];
    craneSelected: boolean = false;
    frameTypeSelected: boolean = false;
    hintsChecked: boolean = true;
    fromTrailer: boolean = false;

    @ViewChild('grappleListBox') grappleListBox!: Dropdown;
    @ViewChild('winchListBox') winchListBox!: Dropdown;
    @ViewChild('hoseGuardListBox') hoseGuardListBox!: Dropdown;
    @ViewChildren('grappleListBoxes') grappleListBoxes!: QueryList<Dropdown>;
    @ViewChild('electricalFloatingCheckBox') electricalFloatingCheckBox!: Checkbox;
    @ViewChild('valveBlockCheckBox') valveBlockCheckBox!: Checkbox;
    @ViewChild('operatorSeatCheckBox') operatorSeatCheckBox!: Checkbox;
    @ViewChild('joystickHolderCheckBox') joystickHolderCheckBox!: Checkbox;
    @ViewChild('coverCheckBox') coverCheckBox!: Checkbox;
    @ViewChild('linkageCheckBox') linkageCheckBox!: Checkbox;

    showControlBlocksDialog: boolean = false;
    showFrameTypesDialog: boolean = false;
    showRotatorsDialog: boolean = false;
    showGrapplesDialog: boolean = false;
    showWinchesDialog: boolean = false;
    showProtectionSleevesDialog: boolean = false;
    showElectricalFloatingDialog: boolean = false;
    showValveBlockDialog: boolean = false;
    showDampingsDialog: boolean = false;
    showLightDialog: boolean = false;
    showOperatorSeatDialog: boolean = false;
    showOilCoolerDialog: boolean = false;
    showRotatorBrakesDialog: boolean = false;
    showJoystickHolderDialog: boolean = false;
    showHoseGuardsDialog: boolean = false;
    showTurningDeviceCounterPlateDialog: boolean = false;
    showSupportLegCounterPlateDialog: boolean = false;
    showBoomGuardDialog: boolean = false;
    showCoverDialog: boolean = false;
    showWoodControlDialog: boolean = false;
    showLinkageDialog: boolean = false;

    controlBlocks: ConfigurationItem[] = [];
    frameTypes: FrameType[] = [];
    rotators: ConfigurationItem[] = [];
    grapples: ConfigurationItem[] = [];
    winches: ConfigurationItem[] = [];
    protectionSleeves: ConfigurationItem | undefined = undefined;
    electricalFloating: ConfigurationItem | undefined = undefined;
    valveBlock: ConfigurationItem | undefined = undefined;
    dampings: ConfigurationItem[] = [];
    light: ConfigurationItem | undefined = undefined;
    operatorSeat: ConfigurationItem | undefined = undefined;
    oilCooler: ConfigurationItem | undefined = undefined;
    rotatorBrakes: ConfigurationItem[] = [];
    joystickHolder: ConfigurationItem | undefined = undefined;
    hoseGuards: ConfigurationItem[] = [];
    turningDeviceCounterPlate: ConfigurationItem | undefined = undefined;
    supportLegCounterPlate: ConfigurationItem | undefined = undefined;
    boomGuard: ConfigurationItem | undefined = undefined;
    cover: ConfigurationItem | undefined = undefined;
    woodControl: ConfigurationItem | undefined = undefined;
    linkage: ConfigurationItem | undefined = undefined;
    craneShipping: ConfigurationItem | undefined = undefined;

    originalControlBlockPrice = 0;
    originalFrameTypePrice = 0;
    originalRotatorPrice = 0;
    originalGrapplePrice = 0;
    originalGrapplePrices: number[] = [];
    originalWinchPrice = 0;
    originalProtectionSleevesPrice = 0;
    originalOilTankCoolerPrice = 0;
    originalElectricalFloatingPrice = 0;
    originalValveBlockPrice = 0;
    originalDampingPrice = 0;
    originalLightPrice = 0;
    originalOperatorSeatPrice = 0;
    originalUnderrunProtectionPrice = 0;
    originalOilCoolerPrice = 0;
    originalRotatorBrakePrice = 0;
    originalJoystickHolderPrice = 0;
    originalHoseGuardPrice = 0;
    originalTurningDeviceCounterPlatePrice = 0;
    originalSupportLegCounterPlatePrice = 0;
    originalBoomguardPrice = 0;
    originalCoverPrice = 0;
    originalWoodControlPrice = 0;
    originalLinkagePrice = 0;
     
    originalCrane: ConfigurationItem | undefined = undefined;
    originalControlBlock: ConfigurationItem | undefined = undefined;
    originalFrameType: ConfigurationItem | undefined = undefined;
    originalRotator: ConfigurationItem | undefined = undefined;
    originalGrapple: ConfigurationItem | undefined = undefined;
    originalGrapples: (ConfigurationItem | undefined)[] = [];
    originalWinch: ConfigurationItem | undefined = undefined;
    originalProtectionSleeves: ConfigurationItem | undefined = undefined;
    originalElectricalFloating: ConfigurationItem | undefined = undefined;
    originalValveBlock: ConfigurationItem | undefined = undefined;
    originalDamping: ConfigurationItem | undefined = undefined;
    originalLight: ConfigurationItem | undefined = undefined;
    originalOperatorSeat: ConfigurationItem | undefined = undefined;
    originalOilCooler: ConfigurationItem | undefined = undefined;
    originalRotatorBrake: ConfigurationItem | undefined = undefined;
    originalJoystickHolder: ConfigurationItem | undefined = undefined;
    originalHoseGuard: ConfigurationItem | undefined = undefined;
    originalTurningDeviceCounterPlate: ConfigurationItem | undefined = undefined;
    originalSupportLegCounterPlate: ConfigurationItem | undefined = undefined;
    originalBoomguard: ConfigurationItem | undefined = undefined;
    originalCover: ConfigurationItem | undefined = undefined;
    originalWoodControl: ConfigurationItem | undefined = undefined;
    originalLinkage: ConfigurationItem | undefined = undefined;
    originalShipping: ConfigurationItem | undefined = undefined;

      get selectedGrapples(): FormArray {
        return this.craneFormGroup.get('selectedGrapples') as FormArray;
      }
    
      addGrapple() {
        this.selectedGrapples.push(this.fb.control(null));
        this.originalGrapplePrices.push(0);
      }
      
      removeGrapple(index: number) {
        this.palmsService._cranePrice.update(cranePrice => cranePrice - this.originalGrapplePrices[index])
        this.palmsService.selectedGrapples.splice(index, 1)
        this.selectedGrapples.removeAt(index);
        this.originalGrapplePrices.splice(index, 1); 
      }

      
    craneFormGroup: FormGroup = new FormGroup({
        selectedCrane: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedControlBlock: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedFrameType: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedGrapples: this.fb.array([]),
        selectedRotator: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedGrapple: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedWinch: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedProtectionSleeves: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedElectricalFloating: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedValveBlock: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedDamping: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedLight: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedOperatorSeat: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedOilCooler: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedRotatorBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedJoystickHolder: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedHoseGuard: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedTurningDeviceCounterPlate: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedSupportLegCounterPlate: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedBoomGuard: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedCover: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedWoodControl: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedLinkage: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedShipping: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    });

    private initializeFormGroup(): void {
        this.craneFormGroup = this.fb.group({
            selectedCrane: null,
            selectedControlBlock: [],
            selectedFrameType: [],
            selectedGrapples: this.fb.array([]),
            selectedRotator: [],
            selectedGrapple: [],
            selectedWinch: [],
            selectedProtectionSleeves: null,
            selectedElectricalFloating: [{ value: null, disabled: true}],
            selectedValveBlock: [{value: null, disabled: true}],
            selectedDamping: [],
            selectedLight: [],
            selectedOperatorSeat: [{value: null, disabled: true}],
            selectedOilCooler: [],
            selectedRotatorBrake: [],
            selectedJoystickHolder: [{value: null, disabled: true}],
            selectedHoseGuard: [],
            selectedTurningDeviceCounterPlate: null,
            selectedSupportLegCounterPlate: null,
            selectedBoomGuard: null,
            selectedCover: [{value: null, disabled: true}],
            selectedWoodControl: null,
            selectedLinkage: [{value: null, disabled: true}],
            selectedShipping: this.craneShipping
        });
    }  
    private destroy$ = new Subject<void>();
    constructor(readonly palmsService: PalmsService,
        readonly palmsCraneConfigService: PalmsCraneConfigService,
        readonly loadingService: LoadingService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router) { 
    }

    ngOnInit(): void {
      
      if (this.id) {
        this.fromTrailer = true;
      } else {
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
      }

      this.loadingService.enableLoader();
      this.palmsService.getCrane(this.id).pipe().subscribe((response) => {
        if(!this.fromTrailer){
          this.palmsService._deleteCrane.next(true);
          this.palmsService._deleteTrailer.next(true);
          this.palmsService._craneSelected.next(false);
          this.palmsService._trailerSelected.next(false);
          this.palmsService._selectedCrane.next(undefined);
          this.palmsService._selectedTrailer.next(undefined);
          this.palmsService._selectedCrane.next(response);
        }
        
        this.crane = response as PalmsCrane;
        
      }).add(() => {
        this.loadingService.disableLoader()
      })
      
      if(this.fromTrailer){
        this.palmsService.selectedCrane$
        .pipe(takeUntil(this.destroy$))
        .subscribe((crane) => {
          
          this.id = crane?.id;
          this.loadCraneConfigurations(this.id!);
          this.palmsService._selectedAccordion.set(1);
        });
      } else {
        this.palmsService.deleteCrane();
        this.palmsService._selectedAccordion.set(0);
        this.palmsService.deleteTrailer();
      }

      this.palmsService.deleteCrane$.subscribe(() => {  
        this.delete();
      })
    }

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }

    navigateToTrailer(trailerId: number){
      const url = `/calculator/palms/trailers/${trailerId}`;
      window.open(url, '_blank');
      }

    loadCraneConfigurations(id: number){ 
        this.loadingService.enableLoader();
        const controlBlocks$ = this.palmsCraneConfigService.getControlBlocks(id);
        const frameTypes$ = this.palmsCraneConfigService.getFrameTypes(id);
        const rotators$ = this.palmsCraneConfigService.getRotators(id);
        const grapples$ = this.palmsCraneConfigService.getGrapples(id);
        const winches$ = this.palmsCraneConfigService.getWinches(id);
        const protectionSleeves$ = this.palmsCraneConfigService.getProtectionSleeves(id);
        const electricalFloating$ = this.palmsCraneConfigService.getElectricalFloating(id);
        const valveBlock$ = this.palmsCraneConfigService.getValveBlock(id);
        const dampings$ = this.palmsCraneConfigService.getDampings(id);
        const light$ = this.palmsCraneConfigService.getLight(id);
        const operatorSeat$ = this.palmsCraneConfigService.getOperatorSeat(id);
        const oilCooler$ = this.palmsCraneConfigService.getOilCooler(id);
        const rotatorBrakes$ = this.palmsCraneConfigService.getRotatorBrakes(id);
        const joystickHolder$ = this.palmsCraneConfigService.getJoystickHolder(id);
        const hoseguards$ = this.palmsCraneConfigService.getHoseGuards(id);
        const turningDeviceCounterPlate$ = this.palmsCraneConfigService.getTurningDeviceCounterPlate(id);
        const supportLegCounterPlate$ = this.palmsCraneConfigService.getSupportLegCounterPlate(id);
        const boomGuard$ = this.palmsCraneConfigService.getBoomGuard(id);
        const cover$ = this.palmsCraneConfigService.getCover(id);
        const woodControl$ = this.palmsCraneConfigService.getWoodControl(id);
        const linkage$ = this.palmsCraneConfigService.getLinkage(id);
        const craneShipping$ = this.palmsCraneConfigService.getShipping(id);
        
        const request = forkJoin([controlBlocks$, frameTypes$, rotators$, grapples$, winches$, 
          protectionSleeves$, electricalFloating$, valveBlock$, dampings$, light$,
          operatorSeat$, oilCooler$, rotatorBrakes$, joystickHolder$, hoseguards$,
          turningDeviceCounterPlate$, supportLegCounterPlate$, boomGuard$, cover$, 
          woodControl$, linkage$, craneShipping$]);
       
        request.subscribe(([controlBlocks, frameTypes, rotators, grapples, winches, 
          protectionSleeves, electricalFloating, valveBlock, dampings, light,
          operatorSeat, oilCooler, rotatorBrakes, joystickHolder, hoseGuards,
          turningDeviceCounterPlate, supportLegCounterPlate, boomGuard, cover, 
          woodControl, linkage, craneShipping]) => {
            if(controlBlocks){
              this.controlBlocks = controlBlocks;
            }

            if(frameTypes){
                this.frameTypes = frameTypes;
            }

            if(rotators){
                this.rotators = rotators;
            }

            if(grapples){
                this.grapples = grapples.map((grapple) => ({
                  ...grapple,
                  disabledOption: grapple.id === 2 
                }));
            }

            if(winches){
              this.winches = winches.map((winch) => ({
                ...winch,
                disabledOption:  winch.id === 2 || winch.id === 3
              }));
            }

            if (protectionSleeves){
              this.protectionSleeves = protectionSleeves;
            }

            if (electricalFloating){
                this.electricalFloating = electricalFloating;
            }

            if (valveBlock){
              this.valveBlock = valveBlock;
            }

            if(dampings){
              this.dampings = dampings;
            }

            if (light){
              this.light = light;
            }

            if (operatorSeat){
              this.operatorSeat = operatorSeat;
            }

            if (oilCooler){
              this.oilCooler = oilCooler;
            }

            if(rotatorBrakes){
              this.rotatorBrakes = rotatorBrakes;
            }

            if (joystickHolder){
              this.joystickHolder = joystickHolder;
            }

            if(hoseGuards){
              this.hoseGuards = hoseGuards.map((hoseGuard) => ({
                ...hoseGuard,
                disabledOption:  true
              }));
            }

            if (turningDeviceCounterPlate){
              this.turningDeviceCounterPlate = turningDeviceCounterPlate;
            }

            if (supportLegCounterPlate){
              this.supportLegCounterPlate = supportLegCounterPlate;
            }

            if (boomGuard){
              this.boomGuard = boomGuard;
            }

            if (cover){
              this.cover = cover;
            }

            if (woodControl){
              this.woodControl = woodControl;
            }

            if (linkage){
              this.linkage = linkage;
            }

            if (craneShipping){
              this.craneShipping = craneShipping;
              this.palmsService.selectedCraneShipping.set(craneShipping);
              this.palmsService._cranePrice.set(Number(craneShipping.price));
            }

            this.initializeFormGroup();
            this.craneSelected = true;
            this.palmsService._cranePrice.update(cranePrice => cranePrice + Number(this.crane.price));
        }).add(() => {
          this.loadingService.disableLoader();
          this.palmsService._craneSelected.next(true);
        })
    } 

    handleControlBlockChange(event: ListboxChangeEvent) {
      const previousValue = this.originalControlBlockPrice;
      this.originalControlBlockPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalControlBlockPrice;
      const current = this.palmsService._cranePrice();
    
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      let updatedFrameTypes: FrameType[] = [];
      let updatedWinches: ConfigurationItem[] = [];
    
      if (event.value) {
        this.originalControlBlock = event.value;
        this.palmsService.selectedControlBlock.set(event.value)
    
        // frame types
        if (event.value.id < 8) {
          updatedFrameTypes = this.updateFrameTypesForControlBlock();
        } else {
          updatedFrameTypes = this.updateFrameTypesToEnabled();
        }
    
        // winches and electrical floating
        if (5 < event.value.id && event.value.id < 14) {
          updatedWinches = this.updateWinchesToEnabled();
          this.craneFormGroup.get('selectedElectricalFloating')?.enable();
        } else {
          updatedWinches = this.updateWinchesForControlBlock();
          this.setElectricalFloatingDefault();
        }

        // valve block
        if (7 < event.value.id && event.value.id < 14) {
          this.craneFormGroup.get('selectedValveBlock')?.enable();
        } else {
          this.setValveBlockDefault();
        }

        // operator seat
        if (event.value.id === 6) {
          this.craneFormGroup.get('selectedOperatorSeat')?.enable();
        } else {
          this.setOperatorSeatDefault();
        }

        // joystick holder
        if (5 < event.value.id && event.value.id < 15) {
          
          this.craneFormGroup.get('selectedJoystickHolder')?.enable();
        } else {
          this.setJoystickHolderDefault();
        }

        // cover
        if (this.availableCoverCodes.includes(event.value.code)) {
          this.craneFormGroup.get('selectedCover')?.enable();
        } else {
          this.setCoverDefault();
        }

      } else {
        this.originalControlBlock = undefined;
        this.palmsService.selectedControlBlock.set(undefined)
    
        updatedFrameTypes = this.updateFrameTypesToEnabled();
        updatedWinches = this.updateWinchesForControlBlock();
        this.setElectricalFloatingDefault();
        this.palmsService.selectedElectricalFloating.set(undefined)
        this.setValveBlockDefault();
        this.palmsService.selectedValveBlock.set(undefined)
        this.setOperatorSeatDefault();
        this.palmsService.selectedOperatorSeat.set(undefined)
        this.setJoystickHolderDefault();
        this.palmsService.selectedJoystickHolder.set(undefined)
        this.setCoverDefault();
        this.palmsService.selectedCover.set(undefined)
    
        // winches
        if (this.originalWinch && (this.originalWinch.id === 2 || this.originalWinch.id === 3)) {
          this.setWinchToDefault();
          this.palmsService.selectedWinch.set(undefined)
        }
      }
    
      this.frameTypes = updatedFrameTypes;
      this.winches = updatedWinches;
    }  
    
    updateFrameTypesForControlBlock(): FrameType[] {
      return this.frameTypes.map((frameType) => ({
        ...frameType,
        disabledOption: frameType.code === "B011" || frameType.code === "B11"
      }));
    }

    updateFrameTypesToEnabled(): FrameType[] {
      return this.frameTypes.map((frameType) => ({
        ...frameType,
        disabledOption: false
      }));
    }

    updateWinchesForControlBlock(): ConfigurationItem[] {
      return this.winches.map((winch) => ({
        ...winch,
        disabledOption: winch.code === "W1" || winch.code === "W2"
      }));
    }

    updateWinchesToEnabled(): ConfigurationItem[] {
      return this.winches.map((winch) => ({
        ...winch,
        disabledOption: false
      }));
    }
    
    handleFrameTypeChange(event: ListboxChangeEvent) {
      const previousValue = this.originalFrameTypePrice;
      this.originalFrameTypePrice = event.value ? event.value.price : 0;
      const nextValue = this.originalFrameTypePrice;
      const current = this.palmsService._cranePrice();
    
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      let updatedControlBlocks: ConfigurationItem[] = [];
      let updatedHoseGuards: ConfigurationItem[] = [];
      let updatedHoseGuardIds: number[] = [];
    
      if (event.value) {
        this.originalFrameType = event.value;
        this.palmsService.selectedFrameType.set(event.value)
    
        if (event.value.code === "B011" || event.value.code === "B11") {
          updatedControlBlocks = this.updateControlBlocksForFrameType();
        } else {
          updatedControlBlocks = this.updateControlBlocksToEnabled();
        }
    
        if (event.value.code === "B3" || event.value.code === "B6.1") {
          updatedHoseGuardIds = [1];
          updatedHoseGuards = this.updateHoseGuardsForFrameType(updatedHoseGuardIds);
          this.setHoseGuardToDefault();
        } else if (event.value.code === "B09" || event.value.code === "B9") {
          updatedHoseGuardIds = [2];
          updatedHoseGuards = this.updateHoseGuardsForFrameType(updatedHoseGuardIds);
          this.setHoseGuardToDefault();
        } else {
          updatedHoseGuards = this.updateHoseGuardsToDisabled();
          this.setHoseGuardToDefault();
        }

        if (event.value.code === "B9" || event.value.code === "B10") {
          this.craneFormGroup.get('selectedLinkage')?.enable();
        } else {
          this.setLinkageDefault()
        }

      } else {
        this.originalFrameType = undefined;
        this.palmsService.selectedFrameType.set(undefined);
        updatedControlBlocks = this.updateControlBlocksToEnabled();
        updatedHoseGuards = this.updateHoseGuardsToDisabled();
        this.setHoseGuardToDefault();
        this.setLinkageDefault();
      }
    
      this.controlBlocks = updatedControlBlocks;
      this.hoseGuards = updatedHoseGuards;
    }
    
    updateControlBlocksForFrameType(): ConfigurationItem[] {
      return this.controlBlocks.map((controlBlock) => ({
        ...controlBlock,
        disabledOption: controlBlock.id < 8
      }));
    }

    updateControlBlocksToEnabled(): ConfigurationItem[]{
      return this.controlBlocks.map((controlBlock) => ({
        ...controlBlock,
        disabledOption: false
      }));
    }

    updateHoseGuardsForFrameType(ids: number[]): ConfigurationItem[] {
      return this.hoseGuards.map((hoseGuard) => ({
        ...hoseGuard,
        disabledOption: !ids.includes(hoseGuard.id)
      }));
    }

    updateHoseGuardsToDisabled(): ConfigurationItem[]{
      return this.hoseGuards.map((hoseGuard) => ({
        ...hoseGuard,
        disabledOption: true
      }));
    }
   
    handleRotatorChange(event: ListboxChangeEvent) {
      const previousValue = this.originalRotatorPrice;
      this.originalRotatorPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalRotatorPrice;
      const current = this.palmsService._cranePrice();
  
      if (previousValue !== nextValue) {
          const newPrice = current - previousValue + Number(nextValue);
          this.palmsService._cranePrice.set(newPrice);
      }
  
      if (event.value) {
          this.originalRotator = event.value;
          this.palmsService.selectedRotator.set(event.value)
          if (event.value.id === parseInt("2")){
            this.updateGrapplesToEnabled();
  
          } else if(this.checkGrappleId(this.originalGrapple)){
            this.setGrappleToDefault();
            this.palmsService.selectedGrapple.set(undefined);
            this.setGrapplesToDefault();
            this.palmsService.selectedGrapples = [];
          } else {
            this.updateGrapplesAvailability();
          }
      } else {
        this.originalRotator = undefined;
        this.palmsService.selectedRotator.set(undefined)

        this.updateGrapplesAvailability();

        if(this.checkGrappleId(this.originalGrapple)) {
          this.setGrappleToDefault();
          this.palmsService.selectedGrapple.set(undefined);
          
        } else if (this.checkGrappleIds(this.originalGrapples)){
          this.setGrapplesToDefault();
        }
      }
    }

    checkGrappleId(grapple: ConfigurationItem | undefined){
      return grapple?.id === 2
    }

    checkGrappleIds(grapples: (ConfigurationItem | undefined)[]){
      return grapples.find((grapple) => grapple?.id === 2)
    }
    
    updateGrapplesAvailability() {
        this.grapples = this.grapples.map((grapple) => ({
            ...grapple,
            disabledOption: grapple.id === 2
        }));
    }

    updateGrapplesToEnabled() {
      this.grapples = this.grapples.map((grapple) => ({
        ...grapple,
        disabledOption: false
      }));
    }

    setGrappleToDefault(){
      if(this.originalGrapple && this.originalGrapple.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalGrapple?.price))
        this.grappleListBox.writeValue(undefined);
        this.originalGrapple = undefined;
        this.originalGrapplePrice = 0;
      }
    }

    setGrapplesToDefault(){
      this.grappleListBoxes.forEach((grappleListBox, index) => {
        if(grappleListBox.value && grappleListBox.value.id === 2){
          this.palmsService._cranePrice.update(value => value - Number(this.originalGrapples[index]?.price))

          let grappleListBoxArray: any = [];
          if(this.grappleListBoxes) grappleListBoxArray = this.grappleListBoxes.toArray();
          if (grappleListBoxArray[index]) grappleListBoxArray[index].writeValue(undefined);

          this.originalGrapples[index] = undefined;
          this.originalGrapplePrices[index] = 0;
          this.palmsService.selectedGrapples[index] = undefined;
        }
      });
    }

    setHoseGuardToDefault(){
      if(this.originalHoseGuard && this.originalHoseGuard.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalHoseGuard?.price))
        this.hoseGuardListBox.writeValue(undefined);
        this.originalHoseGuard = undefined;
        this.palmsService.selectedHoseGuard.set(undefined);
        this.originalHoseGuardPrice = 0;
      }
    }

    handleMultipleGrappleChange(event: ListboxChangeEvent, index: number) {
      const previousValue = this.originalGrapplePrices[index];
      this.originalGrapplePrices[index] = event.value ? event.value.price : 0;
      const nextValue = this.originalGrapplePrices[index];
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalGrapples[index] = event.value
        this.palmsService.selectedGrapples[index] = event.value
      } else {
        this.originalGrapples[index] = undefined;
        this.palmsService.selectedGrapples[index] = undefined
      }
    }

    handleGrappleChange(event: ListboxChangeEvent) {
      const previousValue = this.originalGrapplePrice
      this.originalGrapplePrice = event.value ? event.value.price : 0;
      const nextValue = this.originalGrapplePrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalGrapple = event.value;
        this.palmsService.selectedGrapple.set(event.value)
      } else {
        this.originalGrapple = undefined;
        this.palmsService.selectedGrapple.set(undefined)
      }
    }

    handleWinchChange(event: ListboxChangeEvent) {
      const previousValue = this.originalWinchPrice
      this.originalWinchPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalWinchPrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalWinch = event.value;
        this.palmsService.selectedWinch.set(event.value)
      } else {
        this.originalWinch = undefined;
        this.palmsService.selectedWinch.set(undefined)
      }
    }

    setWinchToDefault(){
      if(this.originalWinch && this.originalWinch.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalWinch?.price))
        this.winchListBox.writeValue(undefined);
        this.originalWinch = undefined;
        this.originalWinchPrice = 0;
      }
    }

    onProtectionSleevesChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalProtectionSleevesPrice = Number(event.checked[0].price);
        this.originalProtectionSleeves = event.checked[0];
        this.palmsService.selectedProtectionSleeves.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalProtectionSleevesPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalProtectionSleeves = undefined;
        this.palmsService.selectedProtectionSleeves.set(undefined)
      }
    }

    onElectricalFloatingChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalElectricalFloatingPrice = Number(event.checked[0].price);
        this.originalElectricalFloating = event.checked[0];
        this.palmsService.selectedElectricalFloating.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalElectricalFloatingPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalElectricalFloating = undefined;
        this.palmsService.selectedElectricalFloating.set(undefined)
      }
    }

    setElectricalFloatingDefault(){
      if(this.originalElectricalFloating && this.originalElectricalFloating.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalElectricalFloating?.price))
        this.electricalFloatingCheckBox.writeValue(undefined);
        this.originalElectricalFloating = undefined;
        this.palmsService.selectedElectricalFloating.set(undefined);
        this.originalElectricalFloatingPrice = 0;
      }
      this.craneFormGroup.get('selectedElectricalFloating')?.disable();
    }

    onValveBlockChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalValveBlockPrice = Number(event.checked[0].price);
        this.originalValveBlock = event.checked[0];
        this.palmsService.selectedValveBlock.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalValveBlockPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalValveBlock = undefined;
        this.palmsService.selectedValveBlock.set(undefined)
      }
    }

    setValveBlockDefault(){
      if(this.originalValveBlock && this.originalValveBlock.price){ 
        this.palmsService._cranePrice.update(value => value - Number(this.originalValveBlock?.price))
        this.valveBlockCheckBox.writeValue(undefined);
        this.originalValveBlock = undefined;
        this.originalValveBlockPrice = 0;
      }
      this.craneFormGroup.get('selectedValveBlock')?.disable();
    }

    handleDampingChange(event: ListboxChangeEvent) {
      const previousValue = this.originalDampingPrice
      this.originalDampingPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalDampingPrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalDamping = event.value;
        this.palmsService.selectedDamping.set(event.value);
      } else {
        this.originalDamping = undefined;
        this.palmsService.selectedDamping.set(undefined);
      }
    }

    onLightChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalLightPrice = Number(event.checked[0].price);
        this.originalLight = event.checked[0];
        this.palmsService.selectedCraneLight.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalLightPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalLight = undefined;
        this.palmsService.selectedCraneLight.set(undefined)
      }
    }

    onOperatorSeatChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalOperatorSeatPrice = Number(event.checked[0].price);
        this.originalOperatorSeat = event.checked[0];
        this.palmsService.selectedOperatorSeat.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalOperatorSeatPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalOperatorSeat = undefined;
        this.palmsService.selectedOperatorSeat.set(undefined)
      }
    }

    setOperatorSeatDefault(){
      if(this.originalOperatorSeat && this.originalOperatorSeat.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalOperatorSeat?.price))
        this.operatorSeatCheckBox.writeValue(undefined);
        this.originalOperatorSeat = undefined;
        this.originalOperatorSeatPrice = 0;
      }
      this.craneFormGroup.get('selectedOperatorSeat')?.disable();
    }

    onOilCoolerChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalOilCoolerPrice = Number(event.checked[0].price);
        this.originalOilCooler = event.checked[0];
        this.palmsService.selectedCraneOilCooler.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalOilCoolerPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalOilCooler = undefined;
        this.palmsService.selectedCraneOilCooler.set(undefined)
      }
    }

    handleRotatorBrakeChange(event: ListboxChangeEvent) {
      const previousValue = this.originalRotatorBrakePrice
      this.originalRotatorBrakePrice = event.value ? event.value.price : 0;
      const nextValue = this.originalRotatorBrakePrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalRotatorBrake = event.value;
        this.palmsService.selectedRotatorBrake.set(event.value)
      } else {
        this.originalRotatorBrake = undefined;
        this.palmsService.selectedRotatorBrake.set(undefined);
      }
    }

    onJoystickHolderChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalJoystickHolderPrice = Number(event.checked[0].price);
        this.originalJoystickHolder = event.checked[0];
        this.palmsService.selectedJoystickHolder.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalJoystickHolderPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalJoystickHolder = undefined;
        this.palmsService.selectedJoystickHolder.set(undefined)
      }
    }

    setJoystickHolderDefault(){
      if(this.originalJoystickHolder && this.originalJoystickHolder.price){ 
        this.palmsService._cranePrice.update(value => value - Number(this.originalJoystickHolder?.price))
        this.joystickHolderCheckBox.writeValue(undefined);
        this.originalJoystickHolder = undefined;
        this.originalJoystickHolderPrice = 0;
      }
      this.craneFormGroup.get('selectedJoystickHolder')?.disable();
    }

    handleHoseGuardChange(event: ListboxChangeEvent) {
      const previousValue = this.originalHoseGuardPrice
      this.originalHoseGuardPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalHoseGuardPrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalHoseGuard = event.value;
        this.palmsService.selectedHoseGuard.set(event.value)
      } else {
        this.originalHoseGuard = undefined;
        this.palmsService.selectedHoseGuard.set(undefined)
      }
    }

    onTurningDeviceCounterPlateChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalTurningDeviceCounterPlatePrice = Number(event.checked[0].price);
        this.originalTurningDeviceCounterPlate = event.checked[0];
        this.palmsService.selectedTurningDeviceCounterPlate.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalTurningDeviceCounterPlatePrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalTurningDeviceCounterPlate = undefined;
        this.palmsService.selectedTurningDeviceCounterPlate.set(undefined)
      }
    }

    onSupportLegCounterPlateChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalSupportLegCounterPlatePrice = Number(event.checked[0].price);
        this.originalSupportLegCounterPlate = event.checked[0];
        this.palmsService.selectedSupportLegCounterPlate.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalSupportLegCounterPlatePrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalSupportLegCounterPlate = undefined;
        this.palmsService.selectedSupportLegCounterPlate.set(undefined)
      }
    }

    onBoomGuardChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalBoomguardPrice = Number(event.checked[0].price);
        this.originalBoomguard = event.checked[0];
        this.palmsService.selectedBoomGuard.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalBoomguardPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalBoomguard = undefined;
        this.palmsService.selectedBoomGuard.set(undefined)
      }
    }

    onCoverChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalCoverPrice = Number(event.checked[0].price);
        this.originalCover = event.checked[0];
        this.palmsService.selectedCover.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalCoverPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalCover = undefined;
        this.palmsService.selectedCover.set(undefined)
      }
    }

    setCoverDefault(){
      if(this.originalCover && this.originalCover.price){ 
        this.palmsService._cranePrice.update(value => value - Number(this.originalCover?.price))
        this.coverCheckBox.writeValue(undefined);
        this.originalCover = undefined;
        this.originalCoverPrice = 0;
      }
      this.craneFormGroup.get('selectedCover')?.disable();
    }

    onWoodControlChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalWoodControlPrice = Number(event.checked[0].price);
        this.originalWoodControl = event.checked[0];
        this.palmsService.selectedWoodControl.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalWoodControlPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalWoodControl = undefined;
        this.palmsService.selectedWoodControl.set(undefined)
      }
    }

    onLinkageChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalLinkagePrice = Number(event.checked[0].price);
        this.originalLinkage = event.checked[0];
        this.palmsService.selectedLinkage.set(event.checked[0])
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalLinkagePrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalLinkage = undefined;
        this.palmsService.selectedLinkage.set(undefined)
      }
    }

    setLinkageDefault(){
      if(this.originalLinkage && this.originalLinkage.price){ 
        this.palmsService._cranePrice.update(value => value - Number(this.originalLinkage?.price))
        this.linkageCheckBox.writeValue(undefined);
        this.originalLinkage = undefined;
        this.palmsService.selectedLinkage.set(undefined);
        this.originalLinkagePrice = 0;
      }
      this.craneFormGroup.get('selectedLinkage')?.disable();
    }

    selectTrailer(trailer: PalmsTrailerOverview){
      this.palmsService._selectedTrailer.next(trailer);
    }
  
    delete() {  
        this.craneFormGroup.reset();
        this.originalControlBlock = undefined;
        this.originalControlBlockPrice = 0;
        this.originalFrameType = undefined;
        this.originalFrameTypePrice = 0;
        this.originalRotator = undefined;
        this.originalRotatorPrice = 0
        this.originalGrapple = undefined
        this.originalGrapplePrice = 0
        this.originalGrapples = [];
        this.originalGrapplePrices = [];
        this.originalWinch = undefined;
        this.originalWinchPrice = 0;
        this.originalProtectionSleeves = undefined;
        this.originalProtectionSleevesPrice = 0;
        this.originalElectricalFloating = undefined;
        this.originalElectricalFloatingPrice = 0;
        this.originalValveBlock = undefined;
        this.originalValveBlockPrice = 0;
        this.originalDamping = undefined;
        this.originalDampingPrice = 0;
        this.originalLight = undefined;
        this.originalLightPrice = 0;
        this.originalOperatorSeat = undefined;
        this.originalOperatorSeatPrice = 0;
        this.originalOilCooler = undefined;
        this.originalOilCoolerPrice = 0;
        this.originalRotatorBrake = undefined;
        this.originalRotatorBrakePrice = 0;
        this.originalJoystickHolder = undefined;
        this.originalJoystickHolderPrice  = 0;
        this.originalHoseGuard = undefined;
        this.originalHoseGuardPrice = 0;
        this.originalTurningDeviceCounterPlate = undefined;
        this.originalTurningDeviceCounterPlatePrice = 0;
        this.originalSupportLegCounterPlate = undefined;
        this.originalSupportLegCounterPlatePrice = 0;
        this.originalBoomguard = undefined;
        this.originalBoomguardPrice = 0;
        this.originalCover = undefined;
        this.originalCoverPrice = 0;
        this.originalWoodControl = undefined;
        this.originalWoodControlPrice = 0;
        this.originalLinkage = undefined;
        this.originalLinkagePrice = 0;
      }

      toggleDialog(dialogType: string, show: boolean) {
        switch (dialogType) {
            case 'controlBlocks':
                this.showControlBlocksDialog = show;
                break;
            case 'frameTypes':
                this.showFrameTypesDialog = show;
                break;   
            case 'rotators':
                this.showRotatorsDialog = show;
                break;
            case 'grapples':
                this.showGrapplesDialog = show;
                break;
            case 'winches':
                this.showWinchesDialog = show;
                break;
            case 'protectionSleeves':
                this.showProtectionSleevesDialog = show;
                break;
            case 'electricalFloating':
                this.showElectricalFloatingDialog = show;
                break;
            case 'valveBlock':
                this.showValveBlockDialog = show;
                break;    
            case 'dampings':
                this.showDampingsDialog = show;
                break;    
            case 'light':
                this.showLightDialog = show;
                break;    
            case 'operatorSeat':
                this.showOperatorSeatDialog = show;
                break;    
            case 'oilCooler':
                this.showOilCoolerDialog = show;
                break;    
            case 'rotatorBrakes':
                this.showRotatorBrakesDialog = show;
                break;    
            case 'joystickHolder':
                this.showJoystickHolderDialog = show;
                break;    
            case 'hoseGuards':
                this.showHoseGuardsDialog = show;
                break;    
            case 'turningDeviceCounterPlate':
                this.showTurningDeviceCounterPlateDialog = show;
                break;    
            case 'supportLegCounterPlate':
                this.showSupportLegCounterPlateDialog = show;
                break;    
            case 'boomGuard':
                this.showBoomGuardDialog = show;
                break;    
            case 'cover':
                this.showCoverDialog = show;
                break;    
            case 'woodControl':
                this.showWoodControlDialog = show;
                break;    
            case 'linkage':
                this.showLinkageDialog = show;
                break;    
            default:
              break;
          }
      }
}
