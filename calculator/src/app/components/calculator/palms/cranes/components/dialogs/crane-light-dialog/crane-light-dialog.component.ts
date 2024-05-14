import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-crane-light-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './crane-light-dialog.component.html',
  styleUrl: './crane-light-dialog.component.css'
})
export class CraneLightDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) craneLightDialogVisible: boolean = false;
  @Input({required: true}) craneLight!: ConfigurationItem;

  closeCraneLightDialog() {
    this.dialogVisible.emit();
  }
}
