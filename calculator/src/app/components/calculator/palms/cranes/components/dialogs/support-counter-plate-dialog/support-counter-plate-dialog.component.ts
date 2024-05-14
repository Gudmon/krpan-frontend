import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-support-counter-plate-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './support-counter-plate-dialog.component.html',
  styleUrl: './support-counter-plate-dialog.component.css'
})
export class SupportCounterPlateDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) supportLegCounterPlateDialogVisible: boolean = false;
  @Input({required: true}) supportLegCounterPlate!: ConfigurationItem;

  closeSupportLegCounterPlateDialog() {
    this.dialogVisible.emit();
  }
}
