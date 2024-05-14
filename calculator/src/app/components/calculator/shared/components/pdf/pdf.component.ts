import { Component, OnInit } from '@angular/core';
import { PalmsService } from '../../../palms/shared/services/palms.service';
import { PdfService } from '../../../../../services/pdf.service';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { concatMap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../../../services/email.service';
import { LoadingService } from '../../../../../services/loading.service';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast';

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

  constructor(private readonly palmsService: PalmsService,
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
    if (this.palmsService._trailerSelected.value === true) {
      const woodSorter = this.palmsService.selectedWoodSorter();
      const newWoodSorter: ConfigurationItem | undefined = woodSorter
        ? {
            ...woodSorter,
            price: woodSorter.price.toString(),
          }
        : undefined;

      const bunkAdapter = this.palmsService.selectedBunkAdapter();
      const newBunkAdapter: ConfigurationItem | undefined = bunkAdapter
        ? {
            ...bunkAdapter,
            price: bunkAdapter.price.toString(),
          }
        : undefined;  
      const bunkExtension = this.palmsService.selectedBunkExtension();
      const newBunkExtension: ConfigurationItem | undefined = bunkExtension
        ? {
            ...bunkExtension,
            price: bunkExtension.price.toString(),
          }
        : undefined;   
      object.TrailerName = this.palmsService._selectedTrailer.value?.name;
      object.Stanchion = this.palmsService.selectedStanchion();
      object.Brake = this.palmsService.selectedBrake();
      object.Propulsion = this.palmsService.selectedPropulsion();
      object.Drawbar = this.palmsService.selectedDrawbar();
      object.Platform = this.palmsService.selectedPlatform();
      object.OilPump = this.palmsService.selectedOilPump();
      object.OilTank = this.palmsService.selectedOilTank();
      object.TrailerOilCooler = this.palmsService.selectedTrailerOilCooler();
      object.BolsterLock = this.palmsService.selectedBolsterLock();
      object.BBox = this.palmsService.selectedBBox();
      object.WoodSorter = newWoodSorter;
      object.HandBrake = this.palmsService.selectedHandBrake();
      object.ChainsawHolder = this.palmsService.selectedChainsawHolder();
      object.UnderrunProtection = this.palmsService.selectedUnderrunProtection();
      object.BunkAdapter = newBunkAdapter;
      object.BunkExtension = newBunkExtension;
      object.FrameExtension = this.palmsService.selectedFrameExtension();
      object.TrailerLight = this.palmsService.selectedTrailerLight();
      object.SupportLeg = this.palmsService.selectedSupportLeg();
      object.Tyre = this.palmsService.selectedTyre();
      object.TrailerShipping = this.palmsService.selectedTrailerShipping();
      object.MOT = this.palmsService.selectedMOT();
      const stanchionExtension = this.palmsService.selectedStanchionExtension();
      const newStanchionExtension: ConfigurationItem | undefined = stanchionExtension
        ? {
            ...stanchionExtension,
            price: stanchionExtension.price.toString(),
          }
        : undefined;
      object.StanchionExtension = newStanchionExtension;
      object.HydroPack = this.palmsService.selectedHydroPack();
    }else {
      object.Grapples = [];
    }

    if (this.palmsService._craneSelected.value === true) {
      const crane: ConfigurationItem = {
        id: this.palmsService._selectedCrane.value!.id,
        name: this.palmsService._selectedCrane.value!.name,
        price: this.palmsService._selectedCrane.value!.price,
        code: '',
        namePrice: this.palmsService._selectedCrane.value!.name + " " + this.palmsService._selectedCrane.value!.price + "€"
      }
      object.Crane = crane;
      object.ControlBlock = this.palmsService.selectedControlBlock();
      object.FrameType = this.palmsService.selectedFrameType();
      object.Rotator = this.palmsService.selectedRotator();
      object.Grapple = this.palmsService.selectedGrapple();
      object.Grapples = this.palmsService.selectedGrapples;
      object.Winch = this.palmsService.selectedWinch();
      object.ProtectionSleeves = this.palmsService.selectedProtectionSleeves();
      object.ElectricalFloating = this.palmsService.selectedElectricalFloating();
      object.ValveBlock = this.palmsService.selectedValveBlock();
      object.Damping = this.palmsService.selectedDamping();
      object.CraneLight = this.palmsService.selectedCraneLight();
      object.OperatorSeat = this.palmsService.selectedOperatorSeat();
      object.CraneOilCooler = this.palmsService.selectedCraneOilCooler();
      object.RotatorBrake = this.palmsService.selectedRotatorBrake();
      object.JoystickHolder = this.palmsService.selectedJoystickHolder();
      object.HoseGuard = this.palmsService.selectedHoseGuard();
      object.TurningDeviceCounterPlate = this.palmsService.selectedTurningDeviceCounterPlate();
      object.SupportLegCounterPlate = this.palmsService.selectedSupportLegCounterPlate();
      object.BoomGuard = this.palmsService.selectedBoomGuard();
      object.Cover = this.palmsService.selectedCover();
      object.WoodControl = this.palmsService.selectedWoodControl();
      object.Linkage = this.palmsService.selectedLinkage();
      object.CraneShipping = this.palmsService.selectedCraneShipping();
    } else {
      object.Grapples = [];
    }

    object.totalPrice = this.palmsService._totalPrice().toString();

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

  sendPdf(){
    const object: PdfModel = {
      Stanchion: this.palmsService.selectedStanchion(),
      Brake: this.palmsService.selectedBrake()
    }
    this.pdfService.sendPdf(object).subscribe((resp) => {
      this.pdfService.pdfId.set(resp.id);
    });
    
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
  Stanchion?: ConfigurationItem | undefined,
  Brake?: ConfigurationItem | undefined,
  Propulsion?: ConfigurationItem | undefined,
  Drawbar?: ConfigurationItem | undefined,
  Platform?: ConfigurationItem | undefined,
  OilPump?: ConfigurationItem | undefined,
  OilTank?: ConfigurationItem | undefined,
  TrailerOilCooler?: ConfigurationItem | undefined,
  BolsterLock?: ConfigurationItem | undefined,
  BBox?: ConfigurationItem | undefined,
  WoodSorter?: ConfigurationItem | undefined,
  HandBrake?: ConfigurationItem | undefined,
  ChainsawHolder?: ConfigurationItem | undefined,
  UnderrunProtection?: ConfigurationItem | undefined,
  BunkAdapter?: ConfigurationItem | undefined,
  BunkExtension?: ConfigurationItem | undefined,
  FrameExtension?: ConfigurationItem | undefined,
  TrailerLight?: ConfigurationItem | undefined,
  SupportLeg?: ConfigurationItem | undefined,
  Tyre?: ConfigurationItem | undefined,
  TrailerShipping?: ConfigurationItem | undefined,
  MOT?: ConfigurationItem | undefined,
  StanchionExtension?: ConfigurationItem | undefined,
  HydroPack?: ConfigurationItem | undefined,
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