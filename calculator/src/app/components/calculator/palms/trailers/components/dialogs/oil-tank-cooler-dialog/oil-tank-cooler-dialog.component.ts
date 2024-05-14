import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-oil-tank-cooler-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './oil-tank-cooler-dialog.component.html',
  styleUrl: './oil-tank-cooler-dialog.component.css'
})
export class OilTankCoolerDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) trailerOilCoolerDialogVisible: boolean = false;

  closeOilTankCoolerDialog() {
    this.dialogVisible.emit();
  }
}
