import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-rotator-brakes-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './rotator-brakes-dialog.component.html',
  styleUrl: './rotator-brakes-dialog.component.css'
})
export class RotatorBrakesDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) rotatorBrakesDialogVisible: boolean = false;
  @Input({required: true}) rotatorBrakes: ConfigurationItem[] = []

  closeRotatorBrakesDialog() {
    this.dialogVisible.emit();
  }
}
