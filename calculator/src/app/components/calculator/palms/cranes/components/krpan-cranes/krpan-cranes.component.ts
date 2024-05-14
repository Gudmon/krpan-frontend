import { SliderChangeEvent, SliderModule, SliderSlideEndEvent } from 'primeng/slider';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { KrpanCraneOverview } from '../../models/krpan-crane-overview';
import { LoadingService } from '../../../../../../services/loading.service';
import { Router } from '@angular/router';
import { KrpanCraneCardsComponent } from '../krpan-crane-cards/krpan-crane-cards.component';
import { KrpanService } from '../../../shared/services/krpan.service';

@Component({
    selector: 'app-krpan-cranes',
    standalone: true,
    templateUrl: './krpan-cranes.component.html',
    styleUrl: './krpan-cranes.component.css',
    imports: [FormsModule, CardModule, SliderModule, KrpanCraneCardsComponent]
})
export class KrpanCranesComponent {
  originalCranes: KrpanCraneOverview[] = []
  cranes: KrpanCraneOverview[] = [];
  rangeValues: number[] = [4.2, 10.1];
  min: number = 4.2
  max: number = 10.1

  constructor(
    readonly krpanService: KrpanService,
    readonly loadingService: LoadingService,
    readonly router: Router){}

  navigateToCrane(crane: KrpanCraneOverview) {
    this.router.navigate(['/calculator/krpan/cranes', crane.id]);
  }
  
  ngOnInit(): void {
    this.loadingService.enableLoader();
    this.krpanService.getCranes().subscribe((resp) => {
      this.krpanService._deleteCrane.next(true);
      this.krpanService._deleteTrailer.next(true);
      this.krpanService._craneSelected.next(false);
      this.krpanService._trailerSelected.next(false);
      this.krpanService._selectedCrane.next(undefined);
      this.krpanService._selectedTrailer.next(undefined);
      
      this.cranes = resp as KrpanCraneOverview[];
      this.originalCranes = resp as KrpanCraneOverview[]  
    }).add(() => {
      this.loadingService.disableLoader();
    })
  }

  filterCranes(event: SliderSlideEndEvent) {
    if (event.values && event.values.length === 2) {
        const minMaxRange = event.values.map(value => parseFloat(value.toString()));
        const min = Math.min(...minMaxRange);
        const max = Math.max(...minMaxRange);

        this.cranes = this.originalCranes.filter(crane => {
            const maxReach = parseFloat(crane.maxReach as string);
            
            return !isNaN(maxReach) && maxReach >= min && maxReach <= max;
        });
        
    } else {
        console.error("Invalid values provided in the event.");
    }
  }
}
