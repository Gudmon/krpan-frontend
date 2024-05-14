import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-bbox-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './bbox-dialog.component.html',
  styleUrl: './bbox-dialog.component.css'
})
export class BboxDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) bBoxDialogVisible: boolean = false;
  @Input({required: true}) bBox!: ConfigurationItem

  closeBboxDialog() {
    this.dialogVisible.emit();
  }
}
