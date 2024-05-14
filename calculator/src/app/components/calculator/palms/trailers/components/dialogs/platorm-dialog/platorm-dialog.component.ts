import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-platorm-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './platorm-dialog.component.html',
  styleUrl: './platorm-dialog.component.css'
})
export class PlatormDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) platformDialogVisible: boolean = false;
  @Input({required: true}) platforms: ConfigurationItem[] = []

  closePlatformDialog() {
    this.dialogVisible.emit();
  }

  getPlatformId(drawbar: ConfigurationItem){
    return Number(drawbar.id);
  }
}
