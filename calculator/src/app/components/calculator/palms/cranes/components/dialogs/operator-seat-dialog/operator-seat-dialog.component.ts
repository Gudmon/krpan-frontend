import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-operator-seat-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './operator-seat-dialog.component.html',
  styleUrl: './operator-seat-dialog.component.css'
})
export class OperatorSeatDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) operatorSeatDialogVisible: boolean = false;
  @Input({required: true}) operatorSeat!: ConfigurationItem;

  closeOperatorSeatDialog() {
    this.dialogVisible.emit();
  }
}
