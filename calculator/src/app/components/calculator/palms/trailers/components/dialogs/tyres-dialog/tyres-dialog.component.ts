import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-tyres-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './tyres-dialog.component.html',
  styleUrl: './tyres-dialog.component.css'
})
export class TyresDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) tyresDialogVisible: boolean = false;
  @Input({required: true}) tyres!: ConfigurationItem []

  closeTyresDialog() {
    this.dialogVisible.emit();
  }
}
