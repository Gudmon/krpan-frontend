import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-linkage-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './linkage-dialog.component.html',
  styleUrl: './linkage-dialog.component.css'
})
export class LinkageDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) linkageDialogVisible: boolean = false;
  @Input({required: true}) linkage!: ConfigurationItem;

  closeLinkageDialog() {
    this.dialogVisible.emit();
  }
}
