import { Component, Input } from '@angular/core';
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accessory-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessory-item.component.html',
  styleUrl: './accessory-item.component.css'
})
export class AccessoryItemComponent {
  @Input({required: true}) accessoryItem: ConfigurationItem | undefined
  @Input() secondaryAccessoryItem: ConfigurationItem | undefined
}
