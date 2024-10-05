import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CartService } from '../../../core/services/cart.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CartItemNoteComponent } from '../cart-item-note/cart-item-note.component';

@Component({
  selector: 'app-cartitem-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgIf,
    MatMenuModule,
    CartItemNoteComponent,
    ModalComponent
  ],
  templateUrl: './cartitem-list.component.html',
  styleUrl: './cartitem-list.component.scss'
})
export class CartitemListComponent {

  @Input() showQuantity: boolean = false;
  @Input() showEditQuantity: boolean = false;
  @Input() showRemove: boolean = false;
  @Input() showNote: boolean = false;
  cartService = inject(CartService);
}
