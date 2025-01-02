import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CartService } from '../../../core/services/cart.service';
import { ModalService, TemplateModalOverlayRef } from '../../../core/services/modal.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { CartItemNoteComponent } from '../cart-item-note/cart-item-note.component';

@Component({
    selector: 'app-cartitem-list',
    imports: [
        CommonModule,
        MatIconModule,
        NgIf,
        MatMenuModule,
        CartItemNoteComponent,
        ModalComponent,
        AddressListComponent,
        PortalModule
    ],
    templateUrl: './cartitem-list.component.html',
    styleUrl: './cartitem-list.component.scss'
})
export class CartitemListComponent {

  private templateRef!: TemplateModalOverlayRef;
  @ViewChild('modalTemplate') modalTemplate!: TemplatePortal<any>;

  @Input() showQuantity: boolean = false;
  @Input() showEditQuantity: boolean = false;
  @Input() showRemove: boolean = false;
  @Input() showNote: boolean = false;

  cartService = inject(CartService);
  modalService = inject(ModalService);

  public openNoteModal() {
    this.templateRef = this.modalService.open(this.modalTemplate, {}, {
      hasBackdropClick: true
    });
  }

  closeTemplateModal() {
    this.templateRef.close();
  }
}
