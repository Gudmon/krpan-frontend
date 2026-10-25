import { KrpanCraneOverview } from '../../../cranes/models/krpan-crane-overview';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
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


  bb4Ids = [1,3];
  bb4CompatibleTyreIds = [2,3,4,8,9];
  bb5Ids = [2,4];
  bb5CompatibleTyreIds = [8,9,10,11];
  driveUnavailableTrailerIds = [1,2,3];
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
  private availableTyres: ConfigurationItem[] = [];
  brakes: ConfigurationItem[] = [];
  private availableBrakes: ConfigurationItem[] = [];
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
  originalAdjustableDrive: ConfigurationItem | undefined = undefined;
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
    this.originalAdjustableDrive = undefined;
    this.krpanService.selectedAdjustableDrive.set(undefined);

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
      selectedTyre: [this.originalTyre ?? this.tyres[0]],
      selectedBrake: [this.originalBrake ?? this.brakes[0]],
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
        
        this.propulsions = this.getCompatiblePropulsions(propulsions);

        if (adjustableDrive){
          this.adjustableDrive = adjustableDrive;
        }

        if (tyres.length > 0){
          this.availableTyres = tyres;
          this.tyres = tyres;
          this.originalTyre = tyres.find((tyre) => parsePrice(tyre.price) === 0) ?? tyres[0];
          this.krpanService.selectedTyre.set(this.originalTyre);
        }

        if (brakes.length > 0){
          this.availableBrakes = brakes;
          this.brakes = brakes;
          this.originalBrake = brakes.find((brake) => parsePrice(brake.price) === 0) ?? brakes[0];
          this.krpanService.selectedBrake.set(this.originalBrake);
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
    const propulsion = event.value as ConfigurationItem | null;
    const selectedOption = propulsion && this.propulsions.find((item) => item.id === propulsion.id);
    if (propulsion && (!selectedOption || selectedOption.disabledOption)) {
      return;
    }

    this.updateSingleSelectionPrice(
      this.originalPropulsion,
      propulsion,
      (propulsion) => {
        this.originalPropulsion = propulsion;
        this.krpanService.selectedPropulsion.set(propulsion);
      }
    );
    this.synchronizeAdjustableDrive(propulsion);

    let updatedTyres: ConfigurationItem[] = [];
    let compatibleTyreIds: number[] | undefined;
    let compatibleBrakeIds: number[] | undefined;

    if (propulsion){
      if (this.bb4Ids.includes(propulsion.id)) {
        compatibleTyreIds = this.getCompatibleTyreIds(propulsion.id);
        updatedTyres = this.updateTyresForPropulsion(compatibleTyreIds);
      } else if (this.bb5Ids.includes(propulsion.id)) {
        compatibleTyreIds = this.getCompatibleTyreIds(propulsion.id);
        updatedTyres = this.updateTyresForPropulsion(compatibleTyreIds);
      } else {
        updatedTyres = this.updateTyresForPropulsion();
      }
      compatibleBrakeIds = this.getCompatibleBrakeIds();
    } else {
      updatedTyres = this.updateTyresForPropulsion();
    }

    this.tyres = updatedTyres;
    this.brakes = this.updateBrakesForPropulsion(compatibleBrakeIds);
    this.synchronizeTyreSelection(compatibleTyreIds);
    this.synchronizeBrakeSelection(compatibleBrakeIds);
  }

  removeAdjustableDrive(){
    if (this.originalAdjustableDrive) {
      this.krpanService._trailerPrice.update((price) =>
        price - parsePrice(this.originalAdjustableDrive?.price)
      );
    }

    this.trailerFormGroup.controls['selectedAdjustableDrive'].setValue(undefined);
    this.originalAdjustableDrive = undefined;
    this.krpanService.selectedAdjustableDrive.set(undefined);
  }

  private synchronizeAdjustableDrive(propulsion: ConfigurationItem | null): void {
    const isFourWheelDrive = propulsion !== null && [3, 4].includes(propulsion.id);

    if (!isFourWheelDrive || !this.adjustableDrive) {
      this.removeAdjustableDrive();
      return;
    }

    if (this.originalAdjustableDrive?.id === this.adjustableDrive.id) {
      this.trailerFormGroup.controls['selectedAdjustableDrive'].setValue(this.adjustableDrive);
      this.krpanService.selectedAdjustableDrive.set(this.adjustableDrive);
      return;
    }

    const previousPrice = parsePrice(this.originalAdjustableDrive?.price);
    const nextPrice = parsePrice(this.adjustableDrive.price);
    this.krpanService._trailerPrice.update((price) => price - previousPrice + nextPrice);
    this.originalAdjustableDrive = this.adjustableDrive;
    this.trailerFormGroup.controls['selectedAdjustableDrive'].setValue(this.adjustableDrive);
    this.krpanService.selectedAdjustableDrive.set(this.adjustableDrive);
  }

  onAdjustableDriveChange(event: CheckboxChangeEvent): void {
    const item = event.checked.length > 0 ? event.checked[0] as ConfigurationItem : undefined;
    const previousPrice = parsePrice(this.originalAdjustableDrive?.price);
    const nextPrice = parsePrice(item?.price);

    this.krpanService._trailerPrice.update((price) => price - previousPrice + nextPrice);
    this.originalAdjustableDrive = item;
    this.trailerFormGroup.controls['selectedAdjustableDrive'].setValue(item ? [item] : []);
    this.krpanService.selectedAdjustableDrive.set(item);
  }

  private getCompatiblePropulsions(propulsions: ConfigurationItem[]): ConfigurationItem[] {
    if (this.driveUnavailableTrailerIds.includes(this.trailer.id)) {
      return [];
    }

    const compatibleTrailerIdsByPropulsion = new Map<number, number[]>([
      [1, [4,6,7]],
      [2, [4,5,7,8]],
      [3, [4,7]],
      [4, [4,5,7,8]]
    ]);

    return propulsions.map((propulsion) => ({
      ...propulsion,
      disabledOption: !compatibleTrailerIdsByPropulsion
        .get(propulsion.id)
        ?.includes(this.trailer.id)
    }));
  }

  private getCompatibleTyreIds(propulsionId: number): number[] {
    let compatibleIds: number[];

    if (this.bb4Ids.includes(propulsionId)) {
      compatibleIds = this.bb4CompatibleTyreIds;
    } else if (this.bb5Ids.includes(propulsionId)) {
      compatibleIds = [5, 8].includes(this.trailer.id)
        ? [...this.bb5CompatibleTyreIds, 5, 12]
        : this.bb5CompatibleTyreIds;
    } else {
      compatibleIds = [];
    }

    return compatibleIds;
  }

  private synchronizeTyreSelection(compatibleIds?: number[]): void {
    const selectedTyre = this.trailerFormGroup.get('selectedTyre')?.value as ConfigurationItem | undefined;
    const compatibleTyre = this.tyres.find((tyre) =>
      tyre.id === selectedTyre?.id && (!compatibleIds || compatibleIds.includes(tyre.id))
    );

    if (compatibleTyre) {
      this.trailerFormGroup.controls['selectedTyre'].setValue(compatibleTyre);
      this.originalTyre = compatibleTyre;
      this.krpanService.selectedTyre.set(compatibleTyre);
      return;
    }

    if (selectedTyre) {
      this.krpanService._trailerPrice.update((total) => total - parsePrice(selectedTyre.price));
    }

    this.trailerFormGroup.controls['selectedTyre'].setValue(undefined);
    this.originalTyre = undefined;
    this.krpanService.selectedTyre.set(undefined);
  }

  private getCompatibleBrakeIds(): number[] | undefined {
    if ([6, 7, 8].includes(this.trailer.id)) {
      return [2, 10, 11];
    }

    if ([4, 5].includes(this.trailer.id)) {
      return [2, 10];
    }

    return undefined;
  }

  private updateBrakesForPropulsion(compatibleIds?: number[]): ConfigurationItem[] {
    return this.availableBrakes.map((brake) => ({
      ...brake,
      disabledOption: compatibleIds ? !compatibleIds.includes(brake.id) : false
    }));
  }

  private synchronizeBrakeSelection(compatibleIds?: number[]): void {
    const selectedBrake = this.trailerFormGroup.get('selectedBrake')?.value as ConfigurationItem | undefined;
    const selectedBrakeIsAllowed = selectedBrake
      && (!compatibleIds || compatibleIds.includes(selectedBrake.id));
    const matchingBrake = selectedBrakeIsAllowed
      ? this.brakes.find((brake) => brake.id === selectedBrake.id)
      : this.brakes.find((brake) =>
        (!compatibleIds || compatibleIds.includes(brake.id)) && parsePrice(brake.price) === 0
      );

    if (!matchingBrake) {
      return;
    }

    this.updateSingleSelectionPrice(this.originalBrake, matchingBrake, (brake) => {
      this.trailerFormGroup.controls['selectedBrake'].setValue(brake);
      this.originalBrake = brake;
      this.krpanService.selectedBrake.set(brake);
    });
  }

  private updateTyresForPropulsion(compatibleIds?: number[]): ConfigurationItem[] {
    return this.availableTyres.map((tyre) => ({
      ...tyre,
      disabledOption: compatibleIds ? !compatibleIds.includes(tyre.id) : false
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
    const previousPrice = parsePrice(previousItem?.price);
    const nextPrice = parsePrice(item?.price);

    this.krpanService._trailerPrice.update((total) => total - previousPrice + nextPrice);
    updateSelection(item);
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