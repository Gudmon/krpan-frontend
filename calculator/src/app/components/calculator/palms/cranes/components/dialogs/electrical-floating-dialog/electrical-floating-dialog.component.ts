import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-electrical-floating-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './electrical-floating-dialog.component.html',
  styleUrl: './electrical-floating-dialog.component.css'
})
export class ElectricalFloatingDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) electricalFloatingDialogVisible: boolean = false;
  @Input({required: true}) electricalFloating!: ConfigurationItem;

  closeElectricalFloatingDialog() {
    this.dialogVisible.emit();
  }
}
