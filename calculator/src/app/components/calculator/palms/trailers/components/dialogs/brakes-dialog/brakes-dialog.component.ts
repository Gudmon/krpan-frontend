import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brakes-dialog',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './brakes-dialog.component.html',
  styleUrl: './brakes-dialog.component.css'
})
export class BrakesDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) brakesDialogVisible: boolean = false;
  @Input({required: true}) brakes: ConfigurationItem[] = []

  closeBrakeDialog() {
    this.dialogVisible.emit();
  }
}
