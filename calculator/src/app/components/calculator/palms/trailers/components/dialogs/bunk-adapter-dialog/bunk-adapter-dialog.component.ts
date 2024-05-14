import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-bunk-adapter-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './bunk-adapter-dialog.component.html',
  styleUrl: './bunk-adapter-dialog.component.css'
})
export class BunkAdapterDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) bunkAdapterDialogVisible: boolean = false;
  @Input({required: true}) bunkAdapter!: ConfigurationItem

  closeBunkAdapterDialog() {
    this.dialogVisible.emit();
  }
}
