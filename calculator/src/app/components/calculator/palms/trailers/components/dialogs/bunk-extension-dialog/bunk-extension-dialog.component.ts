import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-bunk-extension-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './bunk-extension-dialog.component.html',
  styleUrl: './bunk-extension-dialog.component.css'
})
export class BunkExtensionDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) bunkExtensionDialogVisible: boolean = false;
  @Input({required: true}) bunkExtension!: ConfigurationItem

  closeBunkExtensionDialog() {
    this.dialogVisible.emit();
  }
}
