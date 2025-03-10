
import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlay = inject(Overlay);

  open(componentPortal: CdkPortal): ModalOverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'my-overlay-modal-template-backdrop',
      panelClass: 'my-modal-template-panel',
      width: '100vh',
      positionStrategy: new GlobalPositionStrategy()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    const overlayRef = this.overlay.create(overlayConfig);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
    });
    overlayRef.attach(componentPortal);
    return new ModalOverlayRef(overlayRef);
  }


  close(modalOverlayRef: ModalOverlayRef) {
    modalOverlayRef.close();
  }
}

export class ModalOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}




