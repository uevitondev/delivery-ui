import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CartitemListComponent } from '../cartitem-list/cartitem-list.component';
import { OrderService } from '../../order/order.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule, MatIconModule, MatMenuModule, CartitemListComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  orderService = inject(OrderService);
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
}
