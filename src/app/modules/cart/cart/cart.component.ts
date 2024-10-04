import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { RouterService } from '../../../core/services/router.service';
import { CartItemNoteComponent } from '../cart-item-note/cart-item-note.component';
import { CartitemListComponent } from '../cartitem-list/cartitem-list.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgIf,
    MatMenuModule,
    CartitemListComponent,
    CartItemNoteComponent,   
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  routerService = inject(RouterService);
  toastService = inject(ToastrService);
  orderService = inject(OrderService);
  cartService = inject(CartService);
  cartItems$ = this.cartService.cartItems.asObservable();

}
