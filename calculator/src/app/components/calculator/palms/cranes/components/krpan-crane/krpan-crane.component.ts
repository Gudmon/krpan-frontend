import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { KrpanCraneInformationComponent } from "../krpan-crane-information/krpan-crane-information.component";
import { KrpanService } from '../../../shared/services/krpan.service';
import { LoadingService } from '../../../../../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KrpanCrane } from '../../models/krpan-crane';
import { KrpanCraneOverview } from '../../models/krpan-crane-overview';
import { CommonModule } from '@angular/common';
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { KrpanCraneConfigService } from '../../services/krpan-crane-config.service';
import { Subject, forkJoin, of, takeUntil } from 'rxjs';
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
import { KrpanTrailerComponent } from "../../../trailers/components/krpan-trailer/krpan-trailer.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { KrpanCraneCalculatorHintsComponent } from "../krpan-crane-calculator-hints/krpan-crane-calculator-hints.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { KrpanTrailerCardsComponent } from '../../../trailers/components/krpan-trailer-cards/krpan-trailer-cards.component';
import { KrpanTrailerOverview } from '../../../trailers/models/krpan-trailer-overview';
import { parsePrice } from '../../../../../../utils/price.utils';

@Component({
    selector: 'app-krpan-crane',
    standalone: true,
    templateUrl: './krpan-crane.component.html',
    styleUrl: './krpan-crane.component.css',
    imports: [FormsModule, InputSwitchModule, ReactiveFormsModule, AccordionModule, RadioButtonModule, CheckboxModule, NavigationComponent, FooterComponent, KrpanCraneInformationComponent, CommonModule, ListboxModule, AccessoryItemComponent, FormatPricePipe, FrameTypesDialogComponent, ControlBlocksDialogComponent, RotatorsDialogComponent, GrapplesDialogComponent, WinchesDialogComponent, ProtectionSleevesDialogComponent, ElectricalFloatingDialogComponent, ValveBlockDialogComponent, DampingsDialogComponent, CraneLightDialogComponent, OperatorSeatDialogComponent, CraneOilcoolerDialogComponent, RotatorBrakesDialogComponent, JoystickHolderDialogComponent, HoseGuardsDialogComponent, TurningCounterPlateDialogComponent, SupportCounterPlateDialogComponent, BoomguardDialogComponent, CoverDialogComponent, WoodcontrolDialogComponent, LinkageDialogComponent, KrpanTrailerComponent, KrpanTrailerCardsComponent, KrpanCraneCalculatorHintsComponent]
})
export class KrpanCraneComponent implements OnInit, OnDestroy {
    crane!: KrpanCrane

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

    showSlewingDriveDialog: boolean = false;

    controlBlocks: ConfigurationItem[] = [];
    slewingDrive: ConfigurationItem | undefined = undefined;

    originalSlewingDrivePrice = 0;
     
    originalCrane: ConfigurationItem | undefined = undefined;
    originalSlewingDrive: ConfigurationItem | undefined = undefined;

      // get selectedGrapples(): FormArray {
      //   return this.craneFormGroup.get('selectedGrapples') as FormArray;
      // }
    
      // addGrapple() {
      //   this.selectedGrapples.push(this.fb.control(null));
      //   this.originalGrapplePrices.push(0);
      // }
      
      // removeGrapple(index: number) {
      //   this.krpanService._cranePrice.update(cranePrice => cranePrice - this.originalGrapplePrices[index])
      //   this.krpanService.selectedGrapples.splice(index, 1)
      //   this.selectedGrapples.removeAt(index);
      //   this.originalGrapplePrices.splice(index, 1); 
      // }

      
    craneFormGroup: FormGroup = new FormGroup({
        selectedCrane: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedSlewingDrive: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
      
    });

    private initializeFormGroup(): void {
        this.craneFormGroup = this.fb.group({
            selectedCrane: null,
            selectedSlewingDrive: this.slewingDrive,
        });
    }  
    private destroy$ = new Subject<void>();
    constructor(readonly krpanService: KrpanService,
        readonly krpanCraneConfigService: KrpanCraneConfigService,
        readonly loadingService: LoadingService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder) { 
    }

    ngOnInit(): void {
      
      if (this.id) {
        this.fromTrailer = true;
      } else {
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
      }

      this.loadingService.enableLoader();
      this.krpanService.getCrane(this.id).pipe().subscribe((response) => {
        if(!this.fromTrailer){
          this.krpanService._deleteCrane.next(true);
          this.krpanService._deleteTrailer.next(true);
          this.krpanService._craneSelected.next(false);
          this.krpanService._trailerSelected.next(false);
          this.krpanService._selectedCrane.next(undefined);
          this.krpanService._selectedTrailer.next(undefined);
          this.krpanService._selectedCrane.next(response);
        }
        
        this.crane = response as KrpanCrane;
        
      }).add(() => {
        this.loadingService.disableLoader()
      })
      
      if(this.fromTrailer){
        this.krpanService.selectedCrane$
        .pipe(takeUntil(this.destroy$))
        .subscribe((crane) => {
          this.id = crane?.id;
          if (crane) {
            this.loadCraneConfigurations(crane.id, crane);
          }
          this.krpanService._selectedAccordion.set(1);
        });
      } else {
        this.krpanService.deleteCrane();
        this.krpanService._selectedAccordion.set(0);
        this.krpanService.deleteTrailer();
      }

      this.krpanService.deleteCrane$.subscribe(() => {  
        this.delete();
      })
    }

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }

    navigateToTrailer(trailerId: number){
      const url = `/calculator/krpan/trailers/${trailerId}`;
      window.open(url, '_blank');
      }

    loadCraneConfigurations(id: number, selectedCrane?: KrpanCraneOverview){
        const cranePrice = selectedCrane ? parsePrice(selectedCrane.price) : parsePrice(this.crane.price);
        this.krpanService._cranePrice.set(cranePrice);

        if (selectedCrane) {
          this.craneSelected = false;
          this.krpanService._craneSelected.next(false);
          this.krpanService.selectedSlewingDrive.set(undefined);
          this.originalSlewingDrive = undefined;
          this.originalSlewingDrivePrice = 0;
          this.slewingDrive = undefined;
          this.craneFormGroup.reset();
        }

        this.loadingService.enableLoader();
        const crane$ = selectedCrane ? this.krpanService.getCrane(id) : of(this.crane);
        const slewingDrive$ = this.krpanCraneConfigService.getSlewingDrive(id);

        forkJoin({ crane: crane$, slewingDrive: slewingDrive$ }).subscribe(({ crane, slewingDrive }) => {
            if (selectedCrane && this.krpanService._selectedCrane.value?.id !== selectedCrane.id) {
              return;
            }

            this.crane = crane;
            this.krpanService._cranePrice.set(parsePrice(crane.price));

            if(slewingDrive){
              this.slewingDrive = slewingDrive;
              this.krpanService.selectedSlewingDrive.set(slewingDrive);
            }

            this.initializeFormGroup();
            this.craneSelected = true;
            this.krpanService._craneSelected.next(true);
        }).add(() => {
          this.loadingService.disableLoader();
        })
    } 

    onSlewingDriveChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.krpanService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.krpanService._cranePrice.set(newPrice);
        this.originalSlewingDrivePrice = Number(event.checked[0].price);
        this.originalSlewingDrive = event.checked[0];
        this.krpanService.selectedSlewingDrive.set(event.checked[0])
      } else {
        const current = this.krpanService._cranePrice();
        const newPrice = current - this.originalSlewingDrivePrice;
        this.krpanService._cranePrice.set(newPrice);
        this.originalSlewingDrive = undefined;
        this.krpanService.selectedSlewingDrive.set(undefined)
      }
    }
    
    selectTrailer(trailer: KrpanTrailerOverview){
      this.krpanService._selectedTrailer.next(trailer);
    }
  
    delete() {  
        this.craneFormGroup.reset();
        this.originalSlewingDrive = undefined;
        this.originalSlewingDrivePrice = 0;
        
      }

      toggleDialog(dialogType: string, show: boolean) {
        switch (dialogType) {
            case 'slewingDrive':
                this.showSlewingDriveDialog = show;
                break;
            default:
              break;
          }
      }
}
