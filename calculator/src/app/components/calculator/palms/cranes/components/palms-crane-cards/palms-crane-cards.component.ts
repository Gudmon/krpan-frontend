import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PalmsCraneOverview } from '../../models/palms-crane-overview';
import { CardModule } from 'primeng/card';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-palms-crane-cards',
  standalone: true,
  imports: [CardModule, CommonModule, TagModule],
  templateUrl: './palms-crane-cards.component.html',
  styleUrl: './palms-crane-cards.component.css'
})
export class PalmsCraneCardsComponent {
  @Input({required: true}) cranes!: PalmsCraneOverview[];
  @Output() buttonClickEmitter = new EventEmitter<PalmsCraneOverview>();

  constructor(readonly palmsService: PalmsService){}

  buttonClickEmit(crane: PalmsCraneOverview) {
    this.buttonClickEmitter.emit(crane);
  }
}
