import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-propulsions-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './propulsions-dialog.component.html',
  styleUrl: './propulsions-dialog.component.css'
})
export class PropulsionsDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) propulsionsDialogVisible: boolean = false;
  @Input({required: true}) propulsions: ConfigurationItem[] = []

  closePropulsionsDialog() {
    this.dialogVisible.emit();
  }
}
