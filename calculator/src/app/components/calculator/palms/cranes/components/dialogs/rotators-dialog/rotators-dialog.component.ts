import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-rotators-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './rotators-dialog.component.html',
  styleUrl: './rotators-dialog.component.css'
})
export class RotatorsDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) rotatorsDialogVisible: boolean = false;
  @Input({required: true}) rotators: ConfigurationItem[] = []

  closeRotatorsDialog() {
    this.dialogVisible.emit();
  }
}
