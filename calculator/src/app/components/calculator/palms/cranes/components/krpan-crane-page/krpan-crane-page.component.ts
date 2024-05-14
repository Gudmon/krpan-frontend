import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { KrpanService } from '../../../shared/services/krpan.service';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { KrpanCraneComponent } from "../krpan-crane/krpan-crane.component";
import { KrpanCrane } from '../../models/krpan-crane';
import { KrpanTrailerComponent } from "../../../trailers/components/krpan-trailer/krpan-trailer.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { PdfComponent } from "../../../../shared/components/pdf/pdf.component";
import { KrpanTrailerCardsComponent } from '../../../trailers/components/krpan-trailer-cards/krpan-trailer-cards.component';

@Component({
    selector: 'app-krpan-crane-page',
    standalone: true,
    templateUrl: './krpan-crane-page.component.html',
    styleUrl: './krpan-crane-page.component.css',
    imports: [CommonModule, AccordionModule, AccessoryItemComponent, FormatPricePipe, KrpanCraneComponent, KrpanTrailerCardsComponent, KrpanTrailerComponent, FooterComponent, NavigationComponent, PdfComponent]
})
export class KrpanCranePageComponent {
  craneSelected = false;
  trailerSelected = false;
  crane: KrpanCrane | undefined

  constructor(readonly krpanService: KrpanService) {
    
  }

  deleteCrane() { 
    this.krpanService._deleteCrane.next(true);
    this.krpanService.deleteCrane();

    this.krpanService._deleteTrailer.next(true);
    this.krpanService.deleteTrailer();

    this.krpanService._craneSelected.next(false);
    this.krpanService._trailerSelected.next(false);

    this.krpanService._cranePrice.set(0);
    this.krpanService._trailerPrice.set(0);

    this.krpanService._selectedAccordion.set(0);
  }

  deleteTrailer() { 
    this.krpanService._deleteTrailer.next(true);
    this.krpanService.deleteTrailer();
    this.krpanService._trailerSelected.next(false);
    this.krpanService._trailerPrice.set(0);

    this.krpanService._selectedAccordion.set(0);
  }
}
