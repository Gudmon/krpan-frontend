import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { KrpanTrailersComponent } from "../../../trailers/components/krpan-trailers/krpan-trailers.component";
import { KrpanTrailerOverviewHintsComponent } from '../../../trailers/components/krpan-trailer-overview-hints/krpan-trailer-overview-hints.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { KrpanCranesComponent } from "../../../cranes/components/krpan-cranes/krpan-cranes.component";
import { KrpanService } from '../../services/krpan.service';

@Component({
    selector: 'app-krpan-overview',
    standalone: true,
    templateUrl: './krpan-overview.component.html',
    styleUrl: './krpan-overview.component.css',
    imports: [NavigationComponent, FooterComponent, KrpanTrailersComponent, CommonModule, KrpanTrailerOverviewHintsComponent, InputSwitchModule, FormsModule, KrpanCranesComponent]
})
export class KrpanOverviewComponent{
    constructor(readonly krpanService: KrpanService){}

    setSetelectedMachineType(machineType: number, event: Event) {
        this.krpanService._selectedMachineType.next(machineType);
    }
}
