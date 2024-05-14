import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-protection-sleeves-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './protection-sleeves-dialog.component.html',
  styleUrl: './protection-sleeves-dialog.component.css'
})
export class ProtectionSleevesDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) protectionSleevesDialogVisible: boolean = false;
  @Input({required: true}) protectionSleeves!: ConfigurationItem;

  closeProtectionSleevesDialog() {
    this.dialogVisible.emit();
  }
}
