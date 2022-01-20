import { Component, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import A11yDialog from 'a11y-dialog';

type A11yDialogClassNames =
  | 'container'
  | 'overlay'
  | 'document'
  | 'closeButton'
  | 'title';

export type ClassNamesShape = Partial<Record<A11yDialogClassNames, string>>;

@Component({
  selector: 'angular-a11y-dialog',
  templateUrl: './angular-a11y-dialog.component.html',
})
export class AngularA11yDialogComponent implements OnInit, OnDestroy {
  private dialog!: A11yDialog;

  public portalTarget!: string;

  fullTitleId!: string;

  mounted = new BehaviorSubject<boolean>(false)

  @ViewChild('rootElement') rootElement!: ElementRef<HTMLDivElement>;

  @Input() id!: string;
  @Input() appRoot?: string;
  @Input() dialogRoot?: string;
  @Input() classNames: ClassNamesShape = {
    container: 'dialog-container',
    document: 'dialog-content',
    overlay: 'dialog-overlay',
    title: 'dialog-title',
    closeButton: 'dialog-close',
  };
  @Input() role?: 'dialog' | 'alertdialog' = 'dialog';
  @Input() titleId?: string = '';
  @Input() closeButtonLabel?: string = 'Close this dialog window';
  @Input() closeButtonPosition?: 'first' | 'last' | 'none' = 'first';

  @Output() instance = new EventEmitter<A11yDialog>();

  constructor() { }

  ngOnInit(): void {
    this.portalTarget = this.dialogRoot || this.appRoot || 'document.body';
    this.fullTitleId = this.titleId || `${this.id}-title`;

    this.mounted.next(true);
  }

  ngAfterViewInit(): void {
    this.dialog = new A11yDialog(this.rootElement.nativeElement, this.portalTarget);
    this.instance.emit(this.dialog);
  };

  close(): void {
    this.dialog.hide();
  }
  ngOnDestroy(): void {
    if (this.dialog) {
      this.dialog.destroy();
    }
  }
}
