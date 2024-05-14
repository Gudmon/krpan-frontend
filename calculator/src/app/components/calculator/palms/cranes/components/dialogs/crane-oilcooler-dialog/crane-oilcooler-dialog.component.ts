import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-crane-oilcooler-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './crane-oilcooler-dialog.component.html',
  styleUrl: './crane-oilcooler-dialog.component.css'
})
export class CraneOilcoolerDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) oilCoolerDialogVisible: boolean = false;
  @Input({required: true}) oilCooler!: ConfigurationItem;

  closeOilCoolerDialog() {
    this.dialogVisible.emit();
  }
}
