import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../../core/models/cart-item';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { RouterService } from '../../../core/services/router.service';
import { CartItemNoteComponent } from '../cart-item-note/cart-item-note.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    MatMenuModule,
    CartItemNoteComponent,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  dialog = inject(MatDialog);
  routerService = inject(RouterService);
  toastService = inject(ToastrService);
  orderService = inject(OrderService);
  cartService = inject(CartService);
  cartItems: CartItem[] = [];


  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.cartItems;
    });
  }

  addOrEditNote(cartItem: CartItem) {
    this.dialog.open(CartItemNoteComponent, {
      width: 'auto',
      data: cartItem
    });
  }

}
