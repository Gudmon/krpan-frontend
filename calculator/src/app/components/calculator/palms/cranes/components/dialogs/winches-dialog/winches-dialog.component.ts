import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-winches-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './winches-dialog.component.html',
  styleUrl: './winches-dialog.component.css'
})
export class WinchesDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) winchesDialogVisible: boolean = false;
  @Input({required: true}) winches: ConfigurationItem[] = []

  closeWinchesDialog() {
    this.dialogVisible.emit();
  }
}
