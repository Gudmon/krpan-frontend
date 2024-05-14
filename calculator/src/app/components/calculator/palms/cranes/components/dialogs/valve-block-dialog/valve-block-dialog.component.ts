import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-valve-block-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './valve-block-dialog.component.html',
  styleUrl: './valve-block-dialog.component.css'
})
export class ValveBlockDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) valveBlockDialogVisible: boolean = false;
  @Input({required: true}) valveBlock!: ConfigurationItem;

  closeValveBlockDialog() {
    this.dialogVisible.emit();
  }
}
