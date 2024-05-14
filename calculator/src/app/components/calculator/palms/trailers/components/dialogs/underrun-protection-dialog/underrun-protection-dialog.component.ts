import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-underrun-protection-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './underrun-protection-dialog.component.html',
  styleUrl: './underrun-protection-dialog.component.css'
})
export class UnderrunProtectionDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) underrunProtectionDialogVisible: boolean = false;
  @Input({required: true}) underrunProtection!: ConfigurationItem

  closeUnderrunProtectionDialog() {
    this.dialogVisible.emit();
  }
}
