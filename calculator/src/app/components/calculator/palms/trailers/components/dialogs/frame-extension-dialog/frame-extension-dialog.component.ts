import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-frame-extension-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './frame-extension-dialog.component.html',
  styleUrl: './frame-extension-dialog.component.css'
})
export class FrameExtensionDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) frameExtensionDialogVisible: boolean = false;
  @Input({required: true}) frameExtension!: ConfigurationItem

  closeFrameExtensionDialog() {
    this.dialogVisible.emit();
  }
}
