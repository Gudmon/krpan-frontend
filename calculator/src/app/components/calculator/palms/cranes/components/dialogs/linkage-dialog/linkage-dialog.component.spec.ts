import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkageDialogComponent } from './linkage-dialog.component';

describe('LinkageDialogComponent', () => {
  let component: LinkageDialogComponent;
  let fixture: ComponentFixture<LinkageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
