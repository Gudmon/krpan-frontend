import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule } from '@angular/forms';
import { HintItem } from '../../../shared/models/hint-item';

@Component({
  selector: 'app-krpan-trailer-overview-hints',
  standalone: true,
  imports: [TimelineModule, CardModule, CommonModule, InputSwitchModule, FormsModule],
  templateUrl: './krpan-trailer-overview-hints.component.html',
  styleUrl: './krpan-trailer-overview-hints.component.css'
})
export class KrpanTrailerOverviewHintsComponent {
  hints: HintItem[];

  constructor() {
      this.hints = [
          { title: 'D', description: 'Erdészeti pótkocsi' },
          { title: 'DF', description: 'Közelítő pótkocsi' },
      ];
  }
}
