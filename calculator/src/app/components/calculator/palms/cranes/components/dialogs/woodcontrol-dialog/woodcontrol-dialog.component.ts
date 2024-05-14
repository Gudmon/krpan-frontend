import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-woodcontrol-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './woodcontrol-dialog.component.html',
  styleUrl: './woodcontrol-dialog.component.css'
})
export class WoodcontrolDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) woodControlDialogVisible: boolean = false;
  @Input({required: true}) woodControl!: ConfigurationItem;

  closeWoodControlDialog() {
    this.dialogVisible.emit();
  }
}
