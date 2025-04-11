import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CartItemNoteComponent } from '../cart-item-note/cart-item-note.component';
import { CartService } from '../cart.service';
import { ModalComponent } from '../../modal/modal.component';
import { ModalService, ModalOverlayRef } from '../../services/modal.service';

@Component({
  selector: 'app-cartitem-list',
  imports: [CommonModule, MatIconModule, MatMenuModule, CartItemNoteComponent, ModalComponent, PortalModule],
  templateUrl: './cartitem-list.component.html',
  styleUrl: './cartitem-list.component.scss',
})
export class CartitemListComponent {

  @Input() showQuantity: boolean = false;
  @Input() showEditQuantity: boolean = false;
  @Input() showRemove: boolean = false;
  @Input() showNote: boolean = false;

  cartService = inject(CartService);
  modalService = inject(ModalService);
  modalOverlayRef!: ModalOverlayRef;
}
