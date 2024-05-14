import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ConfigItem } from '../../../../../../models/config-item';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { Router } from '@angular/router';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { LoadingService } from '../../../../../../services/loading.service';
import { PalmsTrailerOverviewHintsComponent } from "../palms-trailer-overview-hints/palms-trailer-overview-hints.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { PalmsTrailerCardsComponent } from "../palms-trailer-cards/palms-trailer-cards.component";

@Component({
    selector: 'app-palms-trailers',
    standalone: true,
    templateUrl: './palms-trailers.component.html',
    styleUrl: './palms-trailers.component.css',
    imports: [FormsModule, CommonModule, CardModule, FormatPricePipe, PalmsTrailerOverviewHintsComponent, InputSwitchModule, PalmsTrailerCardsComponent]
})

export class PalmsTrailersComponent implements OnInit {
  hintsChecked: boolean = true;

  originalTrailers: PalmsTrailerOverview[] = []
  trailers: PalmsTrailerOverview[] = [];

  constructor(
    readonly palmsService: PalmsService,
    readonly loadingService: LoadingService,
    readonly router: Router){}

  
  ngOnInit(): void {
    this.loadingService.enableLoader();
    this.palmsService.getTrailers().subscribe((resp) => {
      this.palmsService._deleteTrailer.next(true);
      this.palmsService._deleteCrane.next(true);
      this.palmsService._trailerSelected.next(false);
      this.palmsService._craneSelected.next(false);
      this.palmsService._selectedTrailer.next(undefined);
      this.palmsService._selectedCrane.next(undefined);

      this.trailers = resp as PalmsTrailerOverview[];
      this.originalTrailers = resp as PalmsTrailerOverview[];
    }).add(() => {
      
      this.loadingService.disableLoader();
    })

    this.palmsService.selectedChassisType$.pipe().subscribe((chassisType) => {

      this.filterTrailers(chassisType!);
    })
  }

  navigateToTrailer(trailer: PalmsTrailerOverview) {
    this.router.navigate(['/calculator/palms/trailers', trailer.id]);
  }

  filterTrailers(chassisType: number) {
    if (chassisType === 1) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Egyalvázas");
    } else if (chassisType === 2) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Dupla alvázas");
    } else if (chassisType === 3) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Unibody (Forwarder)");
    } else {
      this.trailers = this.originalTrailers;
    }
  } 

  setSelectedChassisType(chassisType: number, event: Event){
    if(this.palmsService._selectedChassisType.value === chassisType) this.palmsService._selectedChassisType.next(0);

    else {
        this.palmsService._selectedChassisType.next(chassisType);
    }                
}
}
