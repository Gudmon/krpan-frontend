import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-chainsaw-holder-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './chainsaw-holder-dialog.component.html',
  styleUrl: './chainsaw-holder-dialog.component.css'
})
export class ChainsawHolderDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) chainsawHolderDialogVisible: boolean = false;
  @Input({required: true}) chainsawHolder!: ConfigurationItem

  closeChainsawHolderDialog() {
    this.dialogVisible.emit();
  }
}
