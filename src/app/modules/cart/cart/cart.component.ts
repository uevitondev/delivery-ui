import { AsyncPipe, CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { CartItemNoteComponent } from '../cart-item-note/cart-item-note.component';
import { CartitemListComponent } from '../cartitem-list/cartitem-list.component';

@Component({
    selector: 'app-cart',
    imports: [
        RouterLink,
        RouterOutlet,
        CommonModule,
        MatIconModule,
        NgIf,
        MatMenuModule,
        CartitemListComponent,
        CartItemNoteComponent,
        AsyncPipe,
        CurrencyPipe
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
  orderService = inject(OrderService);
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
}
