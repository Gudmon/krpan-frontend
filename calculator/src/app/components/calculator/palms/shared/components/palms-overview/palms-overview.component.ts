import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { PalmsTrailersComponent } from "../../../trailers/components/palms-trailers/palms-trailers.component";
import { PalmsService } from '../../services/palms.service';
import { PalmsTrailerOverviewHintsComponent } from '../../../trailers/components/palms-trailer-overview-hints/palms-trailer-overview-hints.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { PalmsCranesComponent } from "../../../cranes/components/palms-cranes/palms-cranes.component";

@Component({
    selector: 'app-palms-overview',
    standalone: true,
    templateUrl: './palms-overview.component.html',
    styleUrl: './palms-overview.component.css',
    imports: [NavigationComponent, FooterComponent, PalmsTrailersComponent, CommonModule, PalmsTrailerOverviewHintsComponent, InputSwitchModule, FormsModule, PalmsCranesComponent]
})
export class PalmsOverviewComponent{
    constructor(readonly palmsService: PalmsService){}

    setSetelectedMachineType(machineType: number, event: Event) {
        this.palmsService._selectedMachineType.next(machineType);
    }
}
