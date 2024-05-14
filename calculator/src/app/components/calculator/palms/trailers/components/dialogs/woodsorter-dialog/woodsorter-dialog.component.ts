import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-woodsorter-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './woodsorter-dialog.component.html',
  styleUrl: './woodsorter-dialog.component.css'
})
export class WoodsorterDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) woodSorterDialogVisible: boolean = false;
  @Input({required: true}) woodSorter!: ConfigurationItem

  closeWoodSorterDialog() {
    this.dialogVisible.emit();
  }
}
