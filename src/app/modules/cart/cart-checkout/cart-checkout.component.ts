import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../../core/models/address';
import { CartItem } from '../../../core/models/cart-item';
import { ShoppingCartRequest } from '../../../core/models/shopping-cart-request';
import { Store } from '../../../core/models/store';
import { AddressService } from '../../../core/services/address.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { RouterService } from '../../../core/services/router.service';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    AddressListComponent
  ],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.scss'
})
export class CartCheckoutComponent implements OnInit {

  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  cartService = inject(CartService);
  orderService = inject(OrderService);

  cartItems: CartItem[] = [];
  store!: Store;

  isLogged: Boolean = false;
  paymentMethods: string[] = ["DINHEIRO (ESPÉCIE)", "PIX", "CARTÃO"];
  selectedAdress!: Address;
  selectedPaymentMethod!: string;





  ngOnInit(): void {
    if (!this.authService.isLogged()) {
      this.toastService.info("faça login para realizar o checkout");
      this.routerService.toSignIn();
    }
    if (this.cartService.getCartCount() < 1) {
      this.routerService.toCart();
    }
    this.loadDataStoredCart();
  }

  loadDataStoredCart() {
    this.cartService.getCart().subscribe(cart => {
      this.store = cart.store;
      this.cartItems = cart.cartItems;
    });
  }


  selectAddress(address: Address): void {
    this.selectedAdress = address;
  }

  selectPaymentMethod(paymentMethod: string) {
    this.selectedPaymentMethod = paymentMethod;
  }




  saveOrder() {

    let shoppingCartRequest: ShoppingCartRequest = {
      address: this.selectedAdress,
      store: this.store,
      paymentMethod: this.selectedPaymentMethod,
      cartItems: this.cartItems
    }

    console.log(shoppingCartRequest.cartItems);

    this.orderService.saveNew(shoppingCartRequest).subscribe({
      next: () => {        
        this.cartService.clearCart();
        this.routerService.toOrders();
        this.toastService.success("pedido efeuado com sucesso");
      },
      error: (error) => {
        this.toastService.error("erro ao fazer pedido");
      }
    });
  }

}
