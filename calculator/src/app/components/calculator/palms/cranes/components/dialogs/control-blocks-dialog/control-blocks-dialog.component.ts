import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-control-blocks-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './control-blocks-dialog.component.html',
  styleUrl: './control-blocks-dialog.component.css'
})
export class ControlBlocksDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) controlBlocksDialogVisible: boolean = false;
  @Input({required: true}) controlBlocks: ConfigurationItem[] = []

  closeControlBlocksDialog() {
    this.dialogVisible.emit();
  }

}
