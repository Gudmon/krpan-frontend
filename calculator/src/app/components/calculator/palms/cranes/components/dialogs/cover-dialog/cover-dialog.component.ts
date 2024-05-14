import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-cover-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './cover-dialog.component.html',
  styleUrl: './cover-dialog.component.css'
})
export class CoverDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) coverDialogVisible: boolean = false;
  @Input({required: true}) cover!: ConfigurationItem;

  closeCoverDialog() {
    this.dialogVisible.emit();
  }
}
