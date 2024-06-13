import { Component, Input } from '@angular/core';
import { KrpanTrailer } from '../../models/krpan-trailer';

@Component({
  selector: 'app-krpan-trailer-equipment',
  standalone: true,
  imports: [],
  templateUrl: './krpan-trailer-equipment.component.html',
  styleUrl: './krpan-trailer-equipment.component.css'
})
export class KrpanTrailerEquipmentComponent {
  @Input({required: true}) trailer!: KrpanTrailer
}
