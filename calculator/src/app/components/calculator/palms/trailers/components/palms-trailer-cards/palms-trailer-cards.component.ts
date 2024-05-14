import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { CardModule } from 'primeng/card';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-palms-trailer-cards',
  standalone: true,
  imports: [CardModule, CommonModule, TagModule],
  templateUrl: './palms-trailer-cards.component.html',
  styleUrl: './palms-trailer-cards.component.css'
})
export class PalmsTrailerCardsComponent {
  @Input({required: true}) trailers!: PalmsTrailerOverview[];
  @Output() buttonClickEmitter = new EventEmitter<PalmsTrailerOverview>();

  constructor(readonly palmsService: PalmsService) {
    
  }
  buttonClickEmit(trailer: PalmsTrailerOverview) {
    this.buttonClickEmitter.emit(trailer);
  }
}
