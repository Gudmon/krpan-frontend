import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../../../../../footer/footer.component";
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { KrpanTrailerComponent } from "../krpan-trailer/krpan-trailer.component";
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { KrpanService } from '../../../shared/services/krpan.service';
import { KrpanTrailer } from '../../models/krpan-trailer';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { KrpanCraneComponent } from "../../../cranes/components/krpan-crane/krpan-crane.component";
import { PdfComponent } from "../../../../shared/components/pdf/pdf.component";

@Component({
    selector: 'app-krpan-trailer-page',
    standalone: true,
    templateUrl: './krpan-trailer-page.component.html',
    styleUrl: './krpan-trailer-page.component.css',
    imports: [CommonModule, FooterComponent, NavigationComponent, KrpanTrailerComponent, AccordionModule, AccessoryItemComponent, FormatPricePipe, KrpanCraneComponent, PdfComponent]
})
export class KrpanTrailerPageComponent {
  craneSelected = false;
  trailerSelected = false;
  trailer: KrpanTrailer | undefined

  constructor(readonly krpanService: KrpanService) {
    
  }

  deleteTrailer() { 
    this.krpanService._deleteTrailer.next(true);
    this.krpanService.deleteTrailer();

    this.krpanService._deleteCrane.next(true);
    this.krpanService.deleteCrane();

    this.krpanService._trailerSelected.next(false);
    this.krpanService._craneSelected.next(false);

    this.krpanService._trailerPrice.set(0);
    this.krpanService._cranePrice.set(0);

    this.krpanService._selectedAccordion.set(0);
  }

  deleteCrane() { 
    this.krpanService._deleteCrane.next(true);
    this.krpanService.deleteCrane();
    this.krpanService._craneSelected.next(false);
    this.krpanService._cranePrice.set(0);

    this.krpanService._selectedAccordion.set(0);
  }
}
