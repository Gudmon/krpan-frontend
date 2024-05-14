import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-grapples-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './grapples-dialog.component.html',
  styleUrl: './grapples-dialog.component.css'
})
export class GrapplesDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) grapplesDialogVisible: boolean = false;
  @Input({required: true}) grapples: ConfigurationItem[] = []

  closeGrapplesDialog() {
    this.dialogVisible.emit();
  }

}
