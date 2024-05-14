import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-turning-counter-plate-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './turning-counter-plate-dialog.component.html',
  styleUrl: './turning-counter-plate-dialog.component.css'
})
export class TurningCounterPlateDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) turningDeviceCounterPlateDialogVisible: boolean = false;
  @Input({required: true}) turningDeviceCounterPlate!: ConfigurationItem;

  closeTurningDeviceCounterPlateDialog() {
    this.dialogVisible.emit();
  }
}
