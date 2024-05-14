import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KrpanService } from '../../../shared/services/krpan.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { Router } from '@angular/router';
import { LoadingService } from '../../../../../../services/loading.service';
import { KrpanTrailerOverviewHintsComponent } from "../krpan-trailer-overview-hints/krpan-trailer-overview-hints.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { KrpanTrailerCardsComponent } from "../krpan-trailer-cards/krpan-trailer-cards.component";
import { KrpanTrailerOverview } from '../../models/krpan-trailer-overview';

@Component({
    selector: 'app-krpan-trailers',
    standalone: true,
    templateUrl: './krpan-trailers.component.html',
    styleUrl: './krpan-trailers.component.css',
    imports: [FormsModule, CommonModule, CardModule, FormatPricePipe, KrpanTrailerOverviewHintsComponent, InputSwitchModule, KrpanTrailerCardsComponent]
})

export class KrpanTrailersComponent implements OnInit {
  hintsChecked: boolean = true;

  originalTrailers: KrpanTrailerOverview[] = []
  trailers: KrpanTrailerOverview[] = [];

  constructor(
    readonly krpanService: KrpanService,
    readonly loadingService: LoadingService,
    readonly router: Router){}

  
  ngOnInit(): void {
    this.loadingService.enableLoader();
    this.krpanService.getTrailers().subscribe((resp) => {
      this.krpanService._deleteTrailer.next(true);
      this.krpanService._deleteCrane.next(true);
      this.krpanService._trailerSelected.next(false);
      this.krpanService._craneSelected.next(false);
      this.krpanService._selectedTrailer.next(undefined);
      this.krpanService._selectedCrane.next(undefined);

      this.trailers = resp as KrpanTrailerOverview[];
      this.originalTrailers = resp as KrpanTrailerOverview[];
    }).add(() => {
      
      this.loadingService.disableLoader();
    })

    this.krpanService.selectedChassisType$.pipe().subscribe((chassisType) => {

      this.filterTrailers(chassisType!);
    })
  }

  navigateToTrailer(trailer: KrpanTrailerOverview) {
    this.router.navigate(['/calculator/krpan/trailers', trailer.id]);
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
    if(this.krpanService._selectedChassisType.value === chassisType) this.krpanService._selectedChassisType.next(0);

    else {
        this.krpanService._selectedChassisType.next(chassisType);
    }                
}
}
