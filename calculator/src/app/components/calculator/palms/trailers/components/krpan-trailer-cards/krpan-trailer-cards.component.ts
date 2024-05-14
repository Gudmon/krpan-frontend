import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { KrpanService } from '../../../shared/services/krpan.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { KrpanTrailerOverview } from '../../models/krpan-trailer-overview';

@Component({
  selector: 'app-krpan-trailer-cards',
  standalone: true,
  imports: [CardModule, CommonModule, TagModule],
  templateUrl: './krpan-trailer-cards.component.html',
  styleUrl: './krpan-trailer-cards.component.css'
})
export class KrpanTrailerCardsComponent {
  @Input({required: true}) trailers!: KrpanTrailerOverview[];
  @Output() buttonClickEmitter = new EventEmitter<KrpanTrailerOverview>();

  constructor(readonly krpanService: KrpanService) {
    
  }
  buttonClickEmit(trailer: KrpanTrailerOverview) {
    this.buttonClickEmitter.emit(trailer);
  }
}
