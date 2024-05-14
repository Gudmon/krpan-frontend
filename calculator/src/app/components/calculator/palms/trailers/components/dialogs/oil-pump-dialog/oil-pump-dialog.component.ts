import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-oil-pump-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './oil-pump-dialog.component.html',
  styleUrl: './oil-pump-dialog.component.css'
})
export class OilPumpDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) oilPumpsDialogVisible: boolean = false;
  @Input({required: true}) oilPumps: ConfigurationItem[] = []

  closeOilPumpsDialog() {
    this.dialogVisible.emit();
  }
}
