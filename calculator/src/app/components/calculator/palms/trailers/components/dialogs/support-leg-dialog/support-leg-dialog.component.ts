import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-support-leg-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './support-leg-dialog.component.html',
  styleUrl: './support-leg-dialog.component.css'
})
export class SupportLegDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) supportLegDialogVisible: boolean = false;
  @Input({required: true}) supportLegs!: ConfigurationItem []

  closeSupportLegDialog() {
    this.dialogVisible.emit();
  }
}
