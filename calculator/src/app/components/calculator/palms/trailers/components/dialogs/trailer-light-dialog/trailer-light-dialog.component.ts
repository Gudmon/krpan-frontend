import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-trailer-light-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './trailer-light-dialog.component.html',
  styleUrl: './trailer-light-dialog.component.css'
})
export class TrailerLightDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) lightsDialogVisible: boolean = false;
  @Input({required: true}) lights!: ConfigurationItem []

  closeLightsDialog() {
    this.dialogVisible.emit();
  }
}
