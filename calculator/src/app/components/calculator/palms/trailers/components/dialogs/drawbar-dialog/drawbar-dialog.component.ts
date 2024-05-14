import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-drawbar-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './drawbar-dialog.component.html',
  styleUrl: './drawbar-dialog.component.css'
})
export class DrawbarDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) drawbarsDialogVisible: boolean = false;
  @Input({required: true}) drawbars: ConfigurationItem[] = []

  closeDrawbarsDialog() {
    this.dialogVisible.emit();
  }

  getDrawbarId(drawbar: ConfigurationItem){
    return Number(drawbar.id);
  }
}
