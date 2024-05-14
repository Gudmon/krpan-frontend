import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../../../../../footer/footer.component";
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { PalmsTrailerComponent } from "../palms-trailer/palms-trailer.component";
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { PalmsService } from '../../../shared/services/palms.service';
import { PalmsTrailer } from '../../models/palms-trailer';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { PalmsCraneComponent } from "../../../cranes/components/palms-crane/palms-crane.component";
import { PdfComponent } from "../../../../shared/components/pdf/pdf.component";

@Component({
    selector: 'app-palms-trailer-page',
    standalone: true,
    templateUrl: './palms-trailer-page.component.html',
    styleUrl: './palms-trailer-page.component.css',
    imports: [CommonModule, FooterComponent, NavigationComponent, PalmsTrailerComponent, AccordionModule, AccessoryItemComponent, FormatPricePipe, PalmsCraneComponent, PdfComponent]
})
export class PalmsTrailerPageComponent {
  craneSelected = false;
  trailerSelected = false;
  trailer: PalmsTrailer | undefined

  constructor(readonly palmsService: PalmsService) {
    
  }

  deleteTrailer() { 
    this.palmsService._deleteTrailer.next(true);
    this.palmsService.deleteTrailer();

    this.palmsService._deleteCrane.next(true);
    this.palmsService.deleteCrane();

    this.palmsService._trailerSelected.next(false);
    this.palmsService._craneSelected.next(false);

    this.palmsService._trailerPrice.set(0);
    this.palmsService._cranePrice.set(0);

    this.palmsService._selectedAccordion.set(0);
  }

  deleteCrane() { 
    this.palmsService._deleteCrane.next(true);
    this.palmsService.deleteCrane();
    this.palmsService._craneSelected.next(false);
    this.palmsService._cranePrice.set(0);

    this.palmsService._selectedAccordion.set(0);
  }
}
