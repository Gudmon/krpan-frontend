import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-dampings-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dampings-dialog.component.html',
  styleUrl: './dampings-dialog.component.css'
})
export class DampingsDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) dampingsDialogVisible: boolean = false;
  @Input({required: true}) dampings: ConfigurationItem[] = []

  closeDampingsDialog() {
    this.dialogVisible.emit();
  }
}
