import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KrpanCraneOverview } from '../../models/krpan-crane-overview';
import { CardModule } from 'primeng/card';
import { KrpanService } from '../../../shared/services/krpan.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-krpan-crane-cards',
  standalone: true,
  imports: [CardModule, CommonModule, TagModule],
  templateUrl: './krpan-crane-cards.component.html',
  styleUrl: './krpan-crane-cards.component.css'
})
export class KrpanCraneCardsComponent {
  @Input({required: true}) cranes!: KrpanCraneOverview[];
  @Output() buttonClickEmitter = new EventEmitter<KrpanCraneOverview>();

  constructor(readonly krpanService: KrpanService){}

  buttonClickEmit(crane: KrpanCraneOverview) {
    this.buttonClickEmitter.emit(crane);
  }
}
