import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../../../../services/pdf.service';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { concatMap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../../../services/email.service';
import { LoadingService } from '../../../../../services/loading.service';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast';
import { KrpanService } from '../../../palms/shared/services/krpan.service';

@Component({
  selector: 'app-pdf',
  standalone: true,
  providers: [MessageService],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent implements OnInit{
  submitted: boolean = false;
  blurred: boolean = false;
  pdfSaved: boolean = false;

  constructor(private readonly krpanService: KrpanService,
    private readonly pdfService: PdfService,
    private readonly emailService: EmailService,
    private readonly loadingService: LoadingService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,) {
    
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    message: new FormControl<string>('')
  });

  private initializeFormGroup(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }   

  onEmailBlur() {
    this.blurred = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.formGroup.valid){
      this.sendEmail();
    }
  }

  sendPdfAndDownload() {
    const object: PdfModel = {};
    if (this.krpanService._trailerSelected.value === true) {
      const extraStanchion = this.krpanService.selectedExtraStanchion();
      const newExtraStanchion: ConfigurationItem | undefined = extraStanchion
        ? {
            ...extraStanchion,
            price: extraStanchion.price.toString(),
          }
        : undefined;   
      object.ExtraStanchion = newExtraStanchion;

      const extraForwarderStanchion = this.krpanService.selectedExtraForwarderStanchion();
      const newForwarderExtraStanchion: ConfigurationItem | undefined = extraForwarderStanchion
        ? {
            ...extraForwarderStanchion,
            price: extraForwarderStanchion.price.toString(),
          }
        : undefined;   
      object.ExtraForwarderStanchion = newForwarderExtraStanchion;

      object.TrailerName = this.krpanService._selectedTrailer.value?.name;
      object.HydraulicAdjustableChassis = this.krpanService.selectedHydraulicAdjustableChassis();
      object.Lamp = this.krpanService.selectedLamp();
      object.Chock = this.krpanService.selectedChock();
      object.DrawbarSteering = this.krpanService.selectedDrawbarSteering();
      object.SupportLeg = this.krpanService.selectedSupportLeg();
      object.Tyre = this.krpanService.selectedTyre();
      object.Brake = this.krpanService.selectedBrake();
      object.HandBrake = this.krpanService.selectedHandBrake();
      object.Propulsion = this.krpanService.selectedPropulsion();
      object.AdjustableDrive = this.krpanService.selectedAdjustableDrive();
      object.TopConnection = this.krpanService.selectedTopConnection();
      object.Clutch = this.krpanService.selectedClutch();
      object.DrawHead = this.krpanService.selectedDrawHead();
      object.DrawBar = this.krpanService.selectedDrawbar();
      object.CardanShaft = this.krpanService.selectedCardanShaft();
      object.BBox = this.krpanService.selectedBBox();
      object.BaleTransportPlatform = this.krpanService.selectedBaleTransportPlatform();
      object.CargoSpaceExtension = this.krpanService.selectedCargoSpaceExtension();
      object.AxeHolder = this.krpanService.selectedAxeHolder();
      object.ChainsawHolder = this.krpanService.selectedChainsawHolder();
      object.FueltankHolder = this.krpanService.selectedFuelTankHolder();
      object.ToolBox = this.krpanService.selectedToolBox();
      object.Plato = this.krpanService.selectedPlato();
      object.Extension = this.krpanService.selectedExtension();
      object.HydraulicSupportLeg = this.krpanService.selectedHydraulicSupportLeg();
      object.GrappleLocation = this.krpanService.selectedGrappleLocation();

      object.TrailerShipping = this.krpanService.selectedTrailerShipping();
      object.MOT = this.krpanService.selectedMOT();
    }else {
      object.Grapples = [];
    }

    if (this.krpanService._craneSelected.value === true) {
      const crane: ConfigurationItem = {
        id: this.krpanService._selectedCrane.value!.id,
        name: this.krpanService._selectedCrane.value!.name,
        price: this.krpanService._selectedCrane.value!.price,
        code: '',
        namePrice: this.krpanService._selectedCrane.value!.name + " " + this.krpanService._selectedCrane.value!.price + "€"
      }
      object.Crane = crane;
      object.ControlBlock = this.krpanService.selectedControlBlock();
      object.FrameType = this.krpanService.selectedFrameType();
      object.Rotator = this.krpanService.selectedRotator();
      object.Grapple = this.krpanService.selectedGrapple();
      object.Grapples = this.krpanService.selectedGrapples;
      object.Winch = this.krpanService.selectedWinch();
      object.ProtectionSleeves = this.krpanService.selectedProtectionSleeves();
      object.ElectricalFloating = this.krpanService.selectedElectricalFloating();
      object.ValveBlock = this.krpanService.selectedValveBlock();
      object.Damping = this.krpanService.selectedDamping();
      object.CraneLight = this.krpanService.selectedCraneLight();
      object.OperatorSeat = this.krpanService.selectedOperatorSeat();
      object.CraneOilCooler = this.krpanService.selectedCraneOilCooler();
      object.RotatorBrake = this.krpanService.selectedRotatorBrake();
      object.JoystickHolder = this.krpanService.selectedJoystickHolder();
      object.HoseGuard = this.krpanService.selectedHoseGuard();
      object.TurningDeviceCounterPlate = this.krpanService.selectedTurningDeviceCounterPlate();
      object.SupportLegCounterPlate = this.krpanService.selectedSupportLegCounterPlate();
      object.BoomGuard = this.krpanService.selectedBoomGuard();
      object.Cover = this.krpanService.selectedCover();
      object.WoodControl = this.krpanService.selectedWoodControl();
      object.Linkage = this.krpanService.selectedLinkage();
      object.CraneShipping = this.krpanService.selectedCraneShipping();
    } else {
      object.Grapples = [];
    }

    object.totalPrice = this.krpanService._totalPrice().toString();

    this.loadingService.enableLoader();
    this.pdfService
      .sendPdf(object)
      .pipe(
        concatMap((resp) => {
          this.pdfService.pdfId.set(resp.id);
          return this.pdfService.getUserPdf(resp.id)
        })
      )
      .subscribe(
        (blob: Blob) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${this.pdfService.pdfId()}.pdf`;
          link.click();
          this.pdfSaved = true;
        }
      ).add(() => this.loadingService.disableLoader());
  }

  sendEmail(){
    const subject = `Sikeres kalkuláció - ${this.pdfService.pdfId()}`;
    
    const blobName = this.pdfService.pdfId().toString();
    this.loadingService.enableLoader();
    this.emailService.sendEmail(this.formGroup.controls['email'].value , subject, this.formGroup.controls['message'].value, this.formGroup.controls['name'].value, blobName).subscribe((resp) => {
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Siker!', detail: 'Sikeres e-mail küldés!' });
    }).add(() => {
      this.submitted = false;
      this.loadingService.disableLoader()
    });
  }

  getPdf(){
    this.loadingService.enableLoader();
    this.pdfService.getUserPdf(this.pdfService.pdfId()).subscribe(
      (resp) => {
        const blob = new Blob([resp], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'file.pdf';
        link.click();
      }
    ).add(() => this.loadingService.disableLoader());
  }
}

interface PdfTrailerModel {
  TrailerName?: string | undefined,
  HydraulicAdjustableChassis?: ConfigurationItem | undefined,
  Lamp?: ConfigurationItem | undefined,
  HandBrake?: ConfigurationItem | undefined,
  Chock?: ConfigurationItem | undefined,
  DrawbarSteering?: ConfigurationItem | undefined,
  SupportLeg?: ConfigurationItem | undefined,
  Tyre?: ConfigurationItem | undefined,
  Brake?: ConfigurationItem | undefined,
  Propulsion?: ConfigurationItem | undefined,
  AdjustableDrive?: ConfigurationItem | undefined,
  ExtraStanchion?: ConfigurationItem | undefined,
  ExtraForwarderStanchion?: ConfigurationItem | undefined,
  TopConnection?: ConfigurationItem | undefined,
  Clutch?: ConfigurationItem | undefined,
  DrawHead?: ConfigurationItem | undefined,
  DrawBar?: ConfigurationItem | undefined,
  CardanShaft?: ConfigurationItem | undefined,
  BBox?: ConfigurationItem | undefined,
  BaleTransportPlatform?: ConfigurationItem | undefined,
  CargoSpaceExtension?: ConfigurationItem | undefined,
  AxeHolder?: ConfigurationItem | undefined,
  ChainsawHolder?: ConfigurationItem | undefined,
  FueltankHolder?: ConfigurationItem | undefined,
  ToolBox?: ConfigurationItem | undefined,
  Plato?: ConfigurationItem | undefined,
  Extension?: ConfigurationItem | undefined,
  HydraulicSupportLeg?: ConfigurationItem | undefined,
  GrappleLocation?: ConfigurationItem | undefined,
  
  TrailerShipping?: ConfigurationItem | undefined,
  MOT?: ConfigurationItem | undefined,
  
}

interface PdfCraneModel {
  Crane?: ConfigurationItem | undefined,
  ControlBlock?: ConfigurationItem | undefined,
  FrameType?: ConfigurationItem | undefined,
  Rotator?: ConfigurationItem | undefined,
  Grapple?: ConfigurationItem | undefined,
  Grapples?: (ConfigurationItem | undefined)[],
  Winch?: ConfigurationItem | undefined,
  ProtectionSleeves?: ConfigurationItem | undefined,
  ElectricalFloating?: ConfigurationItem | undefined,
  ValveBlock?: ConfigurationItem | undefined,
  Damping?: ConfigurationItem | undefined,
  CraneLight?: ConfigurationItem | undefined,
  OperatorSeat?: ConfigurationItem | undefined,
  CraneOilCooler?: ConfigurationItem | undefined,
  RotatorBrake?: ConfigurationItem | undefined,
  JoystickHolder?: ConfigurationItem | undefined,
  HoseGuard?: ConfigurationItem | undefined,
  TurningDeviceCounterPlate?: ConfigurationItem | undefined,
  SupportLegCounterPlate?: ConfigurationItem | undefined,
  BoomGuard?: ConfigurationItem | undefined,
  Cover?: ConfigurationItem | undefined,
  WoodControl?: ConfigurationItem | undefined,
  Linkage?: ConfigurationItem | undefined,
  CraneShipping?: ConfigurationItem | undefined,
}

export interface PdfModel extends PdfTrailerModel, PdfCraneModel{
  totalPrice?: string | undefined
}