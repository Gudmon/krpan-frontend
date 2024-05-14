import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-boomguard-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './boomguard-dialog.component.html',
  styleUrl: './boomguard-dialog.component.css'
})
export class BoomguardDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) boomGuardDialogVisible: boolean = false;
  @Input({required: true}) boomGuard!: ConfigurationItem

  closeBoomGuardDialog() {
    this.dialogVisible.emit();
  }
}
