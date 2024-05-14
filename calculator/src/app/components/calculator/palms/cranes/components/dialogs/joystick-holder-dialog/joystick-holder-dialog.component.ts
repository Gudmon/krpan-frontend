import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-joystick-holder-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './joystick-holder-dialog.component.html',
  styleUrl: './joystick-holder-dialog.component.css'
})
export class JoystickHolderDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) joystickHolderDialogVisible: boolean = false;
  @Input({required: true}) joystickHolder!: ConfigurationItem;

  closeJoyStickHolderDialog() {
    this.dialogVisible.emit();
  }
}
