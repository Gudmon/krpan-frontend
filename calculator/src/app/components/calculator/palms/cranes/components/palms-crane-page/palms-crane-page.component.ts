import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { PalmsService } from '../../../shared/services/palms.service';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { PalmsCraneComponent } from "../palms-crane/palms-crane.component";
import { PalmsTrailerCardsComponent } from "../../../trailers/components/palms-trailer-cards/palms-trailer-cards.component";
import { PalmsCrane } from '../../models/palms-crane';
import { PalmsTrailerComponent } from "../../../trailers/components/palms-trailer/palms-trailer.component";
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { FooterComponent } from "../../../../../footer/footer.component";
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { PdfComponent } from "../../../../shared/components/pdf/pdf.component";

@Component({
    selector: 'app-palms-crane-page',
    standalone: true,
    templateUrl: './palms-crane-page.component.html',
    styleUrl: './palms-crane-page.component.css',
    imports: [CommonModule, AccordionModule, AccessoryItemComponent, FormatPricePipe, PalmsCraneComponent, PalmsTrailerCardsComponent, PalmsTrailerComponent, FooterComponent, NavigationComponent, PdfComponent]
})
export class PalmsCranePageComponent {
  craneSelected = false;
  trailerSelected = false;
  crane: PalmsCrane | undefined

  constructor(readonly palmsService: PalmsService) {
    
  }

  deleteCrane() { 
    this.palmsService._deleteCrane.next(true);
    this.palmsService.deleteCrane();

    this.palmsService._deleteTrailer.next(true);
    this.palmsService.deleteTrailer();

    this.palmsService._craneSelected.next(false);
    this.palmsService._trailerSelected.next(false);

    this.palmsService._cranePrice.set(0);
    this.palmsService._trailerPrice.set(0);

    this.palmsService._selectedAccordion.set(0);
  }

  deleteTrailer() { 
    this.palmsService._deleteTrailer.next(true);
    this.palmsService.deleteTrailer();
    this.palmsService._trailerSelected.next(false);
    this.palmsService._trailerPrice.set(0);

    this.palmsService._selectedAccordion.set(0);
  }
}
