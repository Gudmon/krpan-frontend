import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-hose-guards-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './hose-guards-dialog.component.html',
  styleUrl: './hose-guards-dialog.component.css'
})
export class HoseGuardsDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) hoseGuardsDialogVisible: boolean = false;
  @Input({required: true}) hoseGuards: ConfigurationItem[] = []

  closeHoseGuardsDialog() {
    this.dialogVisible.emit();
  }
}
