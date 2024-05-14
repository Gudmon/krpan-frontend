import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-oil-tank-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './oil-tank-dialog.component.html',
  styleUrl: './oil-tank-dialog.component.css'
})
export class OilTankDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) oilTanksDialogVisible: boolean = false;
  @Input({required: true}) oilTanks: ConfigurationItem[] = []

  closeOilTanksDialog() {
    this.dialogVisible.emit();
  }
}
