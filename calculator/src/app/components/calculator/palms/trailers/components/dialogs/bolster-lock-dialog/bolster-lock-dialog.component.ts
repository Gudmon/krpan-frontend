import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-bolster-lock-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './bolster-lock-dialog.component.html',
  styleUrl: './bolster-lock-dialog.component.css'
})
export class BolsterLockDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) bolsterLocksDialogVisible: boolean = false;

  closeBolsterLocksDialog() {
    this.dialogVisible.emit();
  }
}
