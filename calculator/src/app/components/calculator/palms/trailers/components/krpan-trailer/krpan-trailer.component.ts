import { KrpanCraneOverview } from '../../../cranes/models/krpan-crane-overview';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Listbox, ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { KrpanTrailerConfigService } from '../../services/krpan-trailer-config.service';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../../../../services/loading.service';
import { KrpanTrailerCalculatorHintsComponent } from '../krpan-trailer-calculator-hints/krpan-trailer-calculator-hints.component';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KrpanTrailer } from '../../models/krpan-trailer';
import { RadioButtonModule } from 'primeng/radiobutton';
import { KrpanCraneCardsComponent } from '../../../cranes/components/krpan-crane-cards/krpan-crane-cards.component';
import { KrpanService } from '../../../shared/services/krpan.service';
import { KrpanTrailerOverview } from '../../models/krpan-trailer-overview';
import { KrpanTrailerInformationComponent } from '../krpan-trailer-information/krpan-trailer-information.component';
import { parsePrice } from '../../../../../../utils/price.utils';

@Component({
    selector: 'app-krpan-trailer',
    standalone: true,
    templateUrl: './krpan-trailer.component.html',
    styleUrl: './krpan-trailer.component.css',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RadioButtonModule, ListboxModule, CheckboxModule, InputSwitchModule, KrpanCraneCardsComponent, KrpanTrailerCalculatorHintsComponent, KrpanTrailerInformationComponent]
})
export class KrpanTrailerComponent implements OnInit, OnDestroy{
  @Input() trailer!: KrpanTrailer
  @Input() id?: number;
  fromCrane: boolean = false;
  trailerSelected: boolean = false;
  hintsChecked: boolean = true;

  @ViewChild('selectedTyreListBox') selectedTyreListBox!: Listbox;
  @ViewChild('selectedBrakeListBox') selectedBrakeListBox!: Listbox;

  bb4Ids = [1,3];
  bb4CompatibleTyreIds = [1,2,4];
  bb4CompatibleBrakeIds = [1,3,4];
  bb5Ids = [2,4];
  bb5CompatibleTyreIds = [5,6];
  previousPropulsionId : number | undefined = undefined;
  dfTrailerIds = [1,2,3,4,5];

  frame:ConfigurationItem | undefined = undefined;
  lamp:ConfigurationItem | undefined = undefined;
  trailerBrakeLamps: ConfigurationItem[] = [];
  wheelChock: ConfigurationItem | undefined = undefined;
  drawbarSteering:ConfigurationItem | undefined = undefined;
  supportLegs: ConfigurationItem[] = [];
  propulsions: ConfigurationItem[] = [];
  adjustableDrive:ConfigurationItem | undefined = undefined;
  tyres: ConfigurationItem[] = [];
  brakes: ConfigurationItem[] = [];
  handBrake: ConfigurationItem | undefined = undefined;
  stanchions: ConfigurationItem[] = [];
  clutches: ConfigurationItem[] = [];
  drawBars: ConfigurationItem[] = [];
  couplingDevices: ConfigurationItem[] = [];
  cardanShaft: ConfigurationItem | undefined = undefined;
  bBox: ConfigurationItem | undefined = undefined;
  baleTransportPlatform: ConfigurationItem | undefined = undefined;
  cargoSpaceExtension: ConfigurationItem | undefined = undefined;
  axeHolder: ConfigurationItem | undefined = undefined;
  chainsawHolder: ConfigurationItem | undefined = undefined;
  fuelTankHolder: ConfigurationItem | undefined = undefined;
  toolBox: ConfigurationItem | undefined = undefined;
  plato: ConfigurationItem | undefined = undefined;
  extension: ConfigurationItem | undefined = undefined;
  grappleLocation: ConfigurationItem | undefined = undefined;

  originalSupportLeg: ConfigurationItem | undefined = undefined;
  originalPropulsion: ConfigurationItem | undefined = undefined;
  originalWheelChock: ConfigurationItem | undefined = undefined;
  originalTyre: ConfigurationItem | undefined = undefined;
  originalBrake: ConfigurationItem | undefined = undefined;
  originalHandBrake: ConfigurationItem | undefined = undefined;
  originalTrailerBrakeLamp: ConfigurationItem | undefined = undefined;
  originalStanchion: ConfigurationItem | undefined = undefined;
  originalClutch: ConfigurationItem | undefined = undefined;
  originalDrawBar: ConfigurationItem | undefined = undefined;
  originalCouplingDevice: ConfigurationItem | undefined = undefined;
  originalCardanShaft: ConfigurationItem | undefined = undefined;
  originalBBox: ConfigurationItem | undefined = undefined;
  originalBaleTransportPlatform: ConfigurationItem | undefined = undefined;
  originalCargoSpaceExtension: ConfigurationItem | undefined = undefined;
  originalAxeHolder: ConfigurationItem | undefined = undefined;
  originalChainsawHolder: ConfigurationItem | undefined = undefined;
  originalFuelTankHolder: ConfigurationItem | undefined = undefined;
  originalToolBox: ConfigurationItem | undefined = undefined;
  originalPlato: ConfigurationItem | undefined = undefined;
  originalExtension: ConfigurationItem | undefined = undefined;
  originalGrappleLocation: ConfigurationItem | undefined = undefined;

  trailerFormGroup: FormGroup = new FormGroup({
    selectedTrailer: new FormControl<string>(''),
    selectedFrame: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedLamp: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedTrailerBrakeLamp: new FormControl<ConfigurationItem | null>(null),
    selectedWheelChock: new FormControl<ConfigurationItem | null>(null),
    selectedDrawbarSteering: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedSupportLeg: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedPropulsion: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedAdjustableDrive: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedTyre: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedHandBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedStanchion: new FormControl<ConfigurationItem | null>(null),
    selectedClutch: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedDrawBar: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedCouplingDevice: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedCardanShaft: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBBox: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBaleTransportPlatform: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedCargoSpaceExtension: new FormControl<ConfigurationItem | null>(null),
    selectedAxeHolder: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedChainsawHolder: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedFuelTankHolder: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedToolBox: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedPlato: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedExtension: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedGrappleLocation: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
  });

  private initializeFormGroup(): void {
    const isDfTrailer = this.dfTrailerIds.includes(this.trailer.id);

    this.trailerFormGroup = this.fb.group({
      selectedFrame: this.frame,
      selectedLamp: this.lamp,
      selectedTrailerBrakeLamp: this.originalTrailerBrakeLamp ?? null,
      selectedWheelChock: this.originalWheelChock,
      selectedDrawbarSteering: this.drawbarSteering,
      selectedSupportLeg: [this.originalSupportLeg ?? null],
      selectedPropulsion: null,
      selectedAdjustableDrive: null,
      selectedTrailer: [this.trailer.name],
      selectedTyre: [this.tyres[0]],
      selectedBrake: [this.brakes[0]],
      selectedHandBrake: this.handBrake,
      selectedStanchion: [this.originalStanchion ?? null],
      selectedClutch: null,
      selectedDrawBar: [this.originalDrawBar ?? null],
      selectedCouplingDevice: [this.originalCouplingDevice ?? null],
      selectedCardanShaft: null,
      selectedBBox: null,
      selectedBaleTransportPlatform: null,
      selectedCargoSpaceExtension: [this.originalCargoSpaceExtension ?? null],
      selectedAxeHolder: isDfTrailer ? null : this.axeHolder,
      selectedChainsawHolder: isDfTrailer ? null : this.chainsawHolder,
      selectedFuelTankHolder: isDfTrailer ? null : this.fuelTankHolder,
      selectedToolBox: isDfTrailer ? null : this.toolBox,
      selectedPlato: null,
      selectedExtension: null,
      selectedGrappleLocation: null,
    });
  }   
  private destroy$ = new Subject<void>();
  constructor(
    readonly krpanService: KrpanService,
    private krpanTrailerConfigService: KrpanTrailerConfigService,
    readonly loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.id) {
      this.fromCrane = true;
    } else {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    }

    this.loadingService.enableLoader();
    this.krpanService.getTrailer(this.id).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if(!this.fromCrane){
        this.krpanService._deleteTrailer.next(true);
        this.krpanService._deleteCrane.next(true);
        this.krpanService._trailerSelected.next(false);
        this.krpanService._craneSelected.next(false);
        this.krpanService._selectedTrailer.next(undefined);
        this.krpanService._selectedCrane.next(undefined); 
        const trailer: KrpanTrailerOverview = {
                        id: response.id,
                        name: response.name,
                        loadCapacity: response.loadCapacity,
                        loadingLength: response.loadingLength,
                        loadingLengthWithExtension: response.loadingLengthWithExtension,
                        weight: response.weight,
                        imageUrl: response.imageUrls?.at(0) ?? '',
                        image: response.images[0]
                    };
                    this.krpanService._selectedTrailer.next(trailer);
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

    this.krpanService.deleteTrailer$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.delete();
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTrailerConfigurations(id: number){ 
    if(id){
      this.loadingService.enableLoader();
      this.krpanTrailerConfigService.getTrailerConfiguration(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({
        frame, lamp, trailerBrakeLamp, wheelChock, drawbarSteering, supportLegs,
        propulsions, adjustableDrive, tyres, brakes, handBrake, stanchions,
        clutches, drawBars, couplingDevices,
        cardanShaft, bBox, baleTransportPlatform, cargoSpaceExtension, axeHolder,
        chainsawHolder, fuelTankHolder, toolBox, plato, extension, grappleLocation
      }) => {

        if (frame){
          this.frame = frame;
        }

        this.cargoSpaceExtension = cargoSpaceExtension ?? undefined;
        this.originalCargoSpaceExtension = cargoSpaceExtension && parsePrice(cargoSpaceExtension.price) === 0
          ? cargoSpaceExtension
          : undefined;
        this.krpanService.selectedCargoSpaceExtension.set(this.originalCargoSpaceExtension);

        if (axeHolder){
          this.axeHolder = axeHolder;
        }

        if (chainsawHolder){
          this.chainsawHolder = chainsawHolder;
        }

        if (fuelTankHolder){
          this.fuelTankHolder = fuelTankHolder;
        }

        if (toolBox){
          this.toolBox = toolBox;
        }

        if (frame){
          this.krpanService.selectedFrame.set(frame);
        }

        if(!this.dfTrailerIds.includes(this.trailer.id)){
          if (axeHolder){
            this.krpanService.selectedAxeHolder.set(axeHolder);
            this.krpanService._trailerPrice.update((trailerPrice => trailerPrice + Number(axeHolder.price)));
          }

          if (chainsawHolder){
            this.krpanService.selectedChainsawHolder.set(chainsawHolder);
            this.krpanService._trailerPrice.update((trailerPrice => trailerPrice + Number(chainsawHolder.price)));
          }

          if (fuelTankHolder){
            this.krpanService.selectedFuelTankHolder.set(fuelTankHolder);
            this.krpanService._trailerPrice.update((trailerPrice => trailerPrice + Number(fuelTankHolder.price)));
          }

          if (toolBox){
            this.krpanService.selectedToolBox.set(toolBox);
            this.krpanService._trailerPrice.update((trailerPrice => trailerPrice + Number(toolBox.price)));
          }
        } 

        if (lamp){
          this.lamp = lamp;
          this.krpanService.selectedLamp.set(lamp);
          this.krpanService._trailerPrice.update((trailerPrice => trailerPrice + Number(lamp.price)));
        }

        this.trailerBrakeLamps = trailerBrakeLamp;
        this.originalTrailerBrakeLamp = trailerBrakeLamp.find((item) => parsePrice(item.price) === 0)
          ?? trailerBrakeLamp[0];
        this.krpanService.selectedTrailerBrakeLamp.set(this.originalTrailerBrakeLamp);

        if (handBrake){
          this.handBrake = handBrake;
          this.krpanService.selectedHandBrake.set(handBrake);
          this.krpanService._trailerPrice.update((trailerPrice => trailerPrice + Number(handBrake.price)));
        }

        this.wheelChock = wheelChock ?? undefined;
        this.originalWheelChock = wheelChock ?? undefined;
        this.krpanService.selectedWheelChock.set(this.originalWheelChock);

        if (drawbarSteering){
          this.drawbarSteering = drawbarSteering;
          this.krpanService.selectedDrawbarSteering.set(drawbarSteering);
          this.krpanService._trailerPrice.update((trailerPrice => trailerPrice + Number(drawbarSteering.price)));
        }

        if (supportLegs.length > 0){
          this.supportLegs = supportLegs;
          this.originalSupportLeg = supportLegs.find((supportLeg) => parsePrice(supportLeg.price) === 0);
          this.krpanService.selectedSupportLeg.set(this.originalSupportLeg);
        }
        
        if (propulsions.length > 0){
          this.propulsions = propulsions;
        }

        if (adjustableDrive){
          this.adjustableDrive = adjustableDrive;
        }

        if (tyres.length > 0){
          this.tyres = tyres;
          this.krpanService.selectedTyre.set(tyres[0])
        }

        if (brakes.length > 0){
          this.brakes = brakes;
          this.krpanService.selectedBrake.set(brakes[0])
        }

        this.stanchions = stanchions;
        this.originalStanchion = stanchions.find((stanchion) => parsePrice(stanchion.price) === 0);
        this.krpanService.selectedStanchion.set(this.originalStanchion);

        if (clutches.length > 0){
          this.clutches = clutches;
        }

        if (drawBars.length > 0){
          this.drawBars = drawBars;
          this.originalDrawBar = drawBars.find((drawBar) => parsePrice(drawBar.price) === 0);
          this.krpanService.selectedDrawbar.set(this.originalDrawBar);
        }

        if (couplingDevices.length > 0){
          this.couplingDevices = couplingDevices;
          this.originalCouplingDevice = couplingDevices.find((couplingDevice) => parsePrice(couplingDevice.price) === 0);
          this.krpanService.selectedCouplingDevice.set(this.originalCouplingDevice);
        }

        if (cardanShaft){
          this.cardanShaft = cardanShaft;
        }

        if (bBox){
          this.bBox = bBox;
        }

        if (baleTransportPlatform){
          this.baleTransportPlatform = baleTransportPlatform;
        }

        if (plato){
          this.plato = plato;
        }

        if (extension){
          this.extension = extension;
        }

        if (grappleLocation){
          this.grappleLocation = grappleLocation;
        }

        this.krpanService._trailerPrice.set(
          parsePrice(this.trailer.price) +
          parsePrice(frame?.price) +
          parsePrice(this.originalSupportLeg?.price) +
          parsePrice(this.originalStanchion?.price) +
          parsePrice(this.originalWheelChock?.price) +
          parsePrice(this.originalTrailerBrakeLamp?.price)
        );
        this.trailerSelected = true;
        this.initializeFormGroup();
      }).add(() => {
        this.loadingService.disableLoader();
        this.krpanService._trailerSelected.next(true);
      });
    }
  }

  handlePropulsionChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalPropulsion,
      event.value,
      (propulsion) => {
        this.originalPropulsion = propulsion;
        this.krpanService.selectedPropulsion.set(propulsion);
      }
    );

    let updatedTyres: ConfigurationItem[] = [];
    let updatedBrakes: ConfigurationItem[] = [];

    if (event.value){
      if (this.bb4Ids.includes(event.value.id)) {
        updatedTyres = this.updateTyresForPropulsion(this.bb4CompatibleTyreIds);
        updatedBrakes = this.updateBrakesForPropulsion();
        this.checkIfTyreInList(this.bb4CompatibleTyreIds);
        this.checkIfBrakeInList(this.bb4CompatibleBrakeIds);
        this.removeAdjustableDrive();
      } else if (this.bb5Ids.includes(event.value.id)) {
        updatedTyres = this.updateTyresForPropulsion(this.bb5CompatibleTyreIds);
        updatedBrakes = this.updateBrakesToEnabled();
        this.checkIfTyreInList(this.bb5CompatibleTyreIds);
        this.addAdjustableDrive(event.value.id);
      } else {
        updatedTyres = this.updateTyresForPropulsion();
        updatedBrakes = this.updateBrakesToEnabled();
      }
      
    } else {
      updatedTyres = this.updateTyresForPropulsion();
      updatedBrakes = this.updateBrakesToEnabled();
      this.removeAdjustableDrive();
      this.previousPropulsionId = undefined;
    }

    this.tyres = updatedTyres;
    this.brakes = updatedBrakes;
  }

  addAdjustableDrive(id: number) {
    this.trailerFormGroup.controls['selectedAdjustableDrive'].setValue(this.adjustableDrive);
    this.krpanService.selectedAdjustableDrive.set(this.adjustableDrive);
  
    const selectedAdjustableDrive = this.trailerFormGroup.get('selectedAdjustableDrive');
    if (
      selectedAdjustableDrive?.value?.price !== undefined &&
      !((this.previousPropulsionId === 2 && id === 4) || (this.previousPropulsionId === 4 && id === 2))
    ) {
      this.krpanService._trailerPrice.update((trailerPrice) =>
        trailerPrice + Number(selectedAdjustableDrive.value.price)
      );
    }
  
    this.previousPropulsionId = id;
  }
  

  removeAdjustableDrive(){
    const selectedAdjustableDrive = this.trailerFormGroup.get('selectedAdjustableDrive');
    if (selectedAdjustableDrive?.value?.price !== undefined) {
      this.krpanService._trailerPrice.update((trailerPrice) =>
        trailerPrice - Number(selectedAdjustableDrive.value.price)
      );
    }

    this.trailerFormGroup.controls['selectedAdjustableDrive'].setValue(undefined);
    this.krpanService.selectedAdjustableDrive.set(undefined);
  }

  checkIfTyreInList(ids: number[]){
    this.updateCompatibleSelection(
      'selectedTyre',
      ids,
      this.tyres,
      this.selectedTyreListBox,
      () => {
        this.originalTyre = undefined;
        this.krpanService.selectedTyre.set(undefined);
      }
    );
  }

  private updateTyresForPropulsion(compatibleIds?: number[]): ConfigurationItem[] {
    return this.tyres.map((tyre) => ({
      ...tyre,
      disabledOption: compatibleIds ? !compatibleIds.includes(tyre.id) : false
    }));
  }

  checkIfBrakeInList(ids: number[]){
    this.updateCompatibleSelection(
      'selectedBrake',
      ids,
      this.brakes,
      this.selectedBrakeListBox,
      () => {
        this.originalBrake = undefined;
        this.krpanService.selectedBrake.set(undefined);
      }
    );
  }

  private updateBrakesForPropulsion(): ConfigurationItem[] {
    return this.brakes.map((brake) => ({
      ...brake,
      disabledOption: brake.id === 2
    }));
  }

  private updateBrakesToEnabled(): ConfigurationItem[] {
    return this.brakes.map((brake) => ({
      ...brake,
      disabledOption: false
    }));
  }

  handleTyreChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalTyre,
      event.value,
      (tyre) => {
        this.originalTyre = tyre;
        this.krpanService.selectedTyre.set(tyre);
      }
    );
  }

  handleBrakeChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalBrake,
      event.value,
      (brake) => {
        this.originalBrake = brake;
        this.krpanService.selectedBrake.set(brake);
      }
    );
  }

  onHandBrakeChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalHandBrake, (item) => {
      this.originalHandBrake = item;
      this.krpanService.selectedHandBrake.set(item);
    });
  }

  handleStanchionChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalStanchion,
      event.value,
      (stanchion) => {
        this.originalStanchion = stanchion;
        this.krpanService.selectedStanchion.set(stanchion);
      }
    );
  }

  handleClutchChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalClutch,
      event.value,
      (clutch) => {
        this.originalClutch = clutch;
        this.krpanService.selectedClutch.set(clutch);
      }
    );
  }

  handleDrawbarChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalDrawBar,
      event.value,
      (drawbar) => {
        this.originalDrawBar = drawbar;
        this.krpanService.selectedDrawbar.set(drawbar);
      }
    );
  }

  handleCouplingDeviceChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalCouplingDevice,
      event.value,
      (couplingDevice) => {
        this.originalCouplingDevice = couplingDevice;
        this.krpanService.selectedCouplingDevice.set(couplingDevice);
      }
    );
  }

  onCardanShaftChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalCardanShaft, (item) => {
      this.originalCardanShaft = item;
      this.krpanService.selectedCardanShaft.set(item);
    });
  }

  onBBoxChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalBBox, (item) => {
      this.originalBBox = item;
      this.krpanService.selectedBBox.set(item);
    });
  }

  onBaleTransportPlatformChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalBaleTransportPlatform, (item) => {
      this.originalBaleTransportPlatform = item;
      this.krpanService.selectedBaleTransportPlatform.set(item);
    });
  }

  onCargoSpaceExtensionChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalCargoSpaceExtension, (item) => {
      this.originalCargoSpaceExtension = item;
      this.krpanService.selectedCargoSpaceExtension.set(item);
    });
  }

  get isCargoSpaceExtensionFree(): boolean {
    return this.cargoSpaceExtension !== undefined && parsePrice(this.cargoSpaceExtension.price) === 0;
  }

  onAxeHolderChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalAxeHolder, (item) => {
      this.originalAxeHolder = item;
      this.krpanService.selectedAxeHolder.set(item);
    });
  }

  onChainsawHolderChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalChainsawHolder, (item) => {
      this.originalChainsawHolder = item;
      this.krpanService.selectedChainsawHolder.set(item);
    });
  }

  onFuelTankHolderChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalFuelTankHolder, (item) => {
      this.originalFuelTankHolder = item;
      this.krpanService.selectedFuelTankHolder.set(item);
    });
  }

  onToolBoxChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalToolBox, (item) => {
      this.originalToolBox = item;
      this.krpanService.selectedToolBox.set(item);
    });
  }

  onPlatoChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalPlato, (item) => {
      this.originalPlato = item;
      this.krpanService.selectedPlato.set(item);
    });
  }

  onExtensionChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalExtension, (item) => {
      this.originalExtension = item;
      this.krpanService.selectedExtension.set(item);
    });
  }

  onGrappleLocationChange(event: CheckboxChangeEvent){
    this.updateCheckboxSelection(event, this.originalGrappleLocation, (item) => {
      this.originalGrappleLocation = item;
      this.krpanService.selectedGrappleLocation.set(item);
    });
  }

  handleSupportLegChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalSupportLeg,
      event.value,
      (supportLeg) => {
        this.originalSupportLeg = supportLeg;
        this.krpanService.selectedSupportLeg.set(supportLeg);
      }
    );
  }

  handleTrailerBrakeLampChange(event: ListboxChangeEvent) {
    this.updateSingleSelectionPrice(
      this.originalTrailerBrakeLamp,
      event.value,
      (trailerBrakeLamp) => {
        this.originalTrailerBrakeLamp = trailerBrakeLamp;
        this.krpanService.selectedTrailerBrakeLamp.set(trailerBrakeLamp);
      }
    );
  }

  private updateSingleSelectionPrice(
    previousItem: ConfigurationItem | undefined,
    item: ConfigurationItem | null | undefined,
    updateSelection: (item: ConfigurationItem | undefined) => void
  ): void {
    const previousPrice = parsePrice(previousItem?.price);
    const nextPrice = parsePrice(item?.price);

    if (previousPrice !== nextPrice) {
      this.krpanService._trailerPrice.update((total) => total - previousPrice + nextPrice);
    }

    updateSelection(item ?? undefined);
  }

  private updateCheckboxSelection(
    event: CheckboxChangeEvent,
    previousItem: ConfigurationItem | undefined,
    updateSelection: (item: ConfigurationItem | undefined) => void
  ): void {
    const item = event.checked.length > 0 ? event.checked[0] as ConfigurationItem : undefined;
    const previousPrice = Number(previousItem?.price ?? 0);
    const nextPrice = item ? Number(item.price) : 0;

    this.krpanService._trailerPrice.update((total) => total - previousPrice + nextPrice);
    updateSelection(item);
  }

  private updateCompatibleSelection(
    controlName: 'selectedTyre' | 'selectedBrake',
    compatibleIds: number[],
    options: ConfigurationItem[],
    listbox: Listbox,
    clearSelection: () => void
  ): void {
    const selectedItem = this.trailerFormGroup.get(controlName)?.value as ConfigurationItem | undefined;

    if (compatibleIds.includes(selectedItem?.id ?? -1)) {
      setTimeout(() => {
        listbox.updateModel(options.find((option) => option.id === selectedItem?.id));
      }, 100);
      return;
    }

    if (selectedItem?.price !== undefined) {
      this.krpanService._trailerPrice.update((total) => total - Number(selectedItem.price));
    }

    this.trailerFormGroup.controls[controlName].setValue(undefined);
    clearSelection();
  }

  navigateToCrane(craneId: number){
    const url = `/calculator/krpan/cranes/${craneId}`;
    window.open(url, '_blank');
  }

  selectCrane(crane: KrpanCraneOverview){
    this.krpanService._selectedCrane.next(crane);
  }

  delete() {
    this.trailerFormGroup.reset();
    this.trailerSelected = false;
    this.originalBrake = undefined;
    this.originalStanchion = undefined;
    this.originalTrailerBrakeLamp = undefined;
    this.trailerBrakeLamps = [];
    this.krpanService.selectedStanchion.set(undefined);
    this.originalPropulsion = undefined;
    this.originalDrawBar = undefined;
    this.originalBBox = undefined; 
    this.originalHandBrake = undefined;  
    this.originalAxeHolder = undefined; 
    this.originalChainsawHolder = undefined; 
    this.originalSupportLeg = undefined;
    this.originalTyre = undefined; 
  
  }
}