import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FrameType } from '../../../models/frame-type';


@Component({
  selector: 'app-frame-types-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './frame-types-dialog.component.html',
  styleUrl: './frame-types-dialog.component.css'
})
export class FrameTypesDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) frameTypesDialogVisible: boolean = false;
  @Input({required: true}) frameTypes: FrameType[] = []

  closeFrameTypeDialog() {
    this.dialogVisible.emit();
  }

  getFrameTypeId(frameType: FrameType){
    return Number(frameType.id);
  }
}
