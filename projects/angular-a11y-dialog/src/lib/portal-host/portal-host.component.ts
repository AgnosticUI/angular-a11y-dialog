import {
  AfterViewInit,
  Component,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'portal-host',
  templateUrl: './portal-host.component.html',
  styleUrls: ['./portal-host.component.css']
})
export class PortalHostComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('portalTemplateReference') portalTemplateRef: any;
  private embeddedViewRef!: EmbeddedViewRef<{}>;

  /**
   * Teleport to selector. Falls back to document.body
   */
  @Input() teleportTo: string = 'document.body';

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(
      this.portalTemplateRef
    );
    this.embeddedViewRef.detectChanges();

    let outletElement = document.querySelector(this.teleportTo) as HTMLElement;

    this.embeddedViewRef.rootNodes.forEach(rootNode => {
      outletElement.appendChild(rootNode);
    });
  }

  ngOnDestroy(): void {
    const index = this.viewContainerRef.indexOf(this.embeddedViewRef);
    if (index !== -1) {
      this.viewContainerRef.remove(index);
    }
  }
}