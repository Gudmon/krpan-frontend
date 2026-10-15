import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { KrpanService } from '../../../shared/services/krpan.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { KrpanTrailerOverview } from '../../models/krpan-trailer-overview';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

@Component({
  selector: 'app-krpan-trailer-cards',
  standalone: true,
  imports: [CardModule, CommonModule, TagModule, CloudinaryModule],
  templateUrl: './krpan-trailer-cards.component.html',
  styleUrl: './krpan-trailer-cards.component.css'
})
export class KrpanTrailerCardsComponent {
  _trailers: KrpanTrailerOverview[] = [];
    @Input({ required: true }) set trailers(trailers: KrpanTrailerOverview[]) {
        trailers.map((trailer) => {
            trailer.image = this.cld.image(trailer.imageUrl).resize(fill().width(300).height(200));
        });
        this._trailers = trailers;
    }
  @Output() buttonClickEmitter = new EventEmitter<KrpanTrailerOverview>();

  private cld = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });

  constructor(readonly krpanService: KrpanService) {
    
  }
  buttonClickEmit(trailer: KrpanTrailerOverview) {
    this.buttonClickEmitter.emit(trailer);
  }
}
