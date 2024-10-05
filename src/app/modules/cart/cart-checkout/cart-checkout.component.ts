import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Address } from '../../../core/models/address';
import { CartItem } from '../../../core/models/cart-item';
import { ShoppingCartRequest } from '../../../core/models/shopping-cart-request';
import { Store } from '../../../core/models/store';
import { AddressService } from '../../../core/services/address.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { RouterService } from '../../../core/services/router.service';
import { StorageService } from '../../../core/services/storage.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { PaymentListComponent } from '../../payment/payment-list/payment-list.component';
import { CartItemNoteComponent } from '../cart-item-note/cart-item-note.component';
import { CartitemListComponent } from '../cartitem-list/cartitem-list.component';

@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    AddressListComponent,
    PaymentListComponent,
    CartItemNoteComponent,
    CartitemListComponent
  ],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.scss',
  animations: [

    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('modal', [
      transition(':enter', [
        style({ top: -999 }),
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
        animate('250ms', style({ top: -999 }))
      ])
    ]),
  ]
})

export class CartCheckoutComponent implements OnInit {

  STORED_STORE = environment.STORED_STORE;
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  routerService = inject(RouterService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  cartService = inject(CartService);
  orderService = inject(OrderService);
  cartItems$ = this.cartService.cartItems;

  checkoutStore!: Store;
  checkoutAddress!: Address;
  checkoutPaymentMethod!: string;

  isLoading: boolean = false;
  finalCartItems!: CartItem[];

  ngOnInit(): void {
    this.loadCheckoutStore();
    this.cartService.cartItems.subscribe({
      next: (cartItems) => {
        this.finalCartItems = cartItems;
      }
    });
  }

  loadCheckoutStore() {
    let store = this.storageService.get(this.STORED_STORE);
    if (store) {
      this.checkoutStore = store;
    }
  }

  selectAddress(address: Address): void {
    this.checkoutAddress = address;
  }

  selectPaymentMethod(paymentMethod: string): void {
    this.checkoutPaymentMethod = paymentMethod;
  }

  checkoutIsInvalid() {
    if (
      this.checkoutAddress === undefined ||
      this.checkoutStore === undefined ||
      this.checkoutPaymentMethod === undefined ||
      this.finalCartItems.length < 1
    ) {
      return true;
    } else {
      return false;
    }
  }


  saveOrder() {
    this.isLoading = true;

    let shoppingCartRequest: ShoppingCartRequest = {
      addressId: this.checkoutAddress.id,
      storeId: this.checkoutStore.id,
      paymentMethod: this.checkoutPaymentMethod,
      cartItems: this.finalCartItems
    }

    this.orderService.saveNew(shoppingCartRequest)
      .pipe(
        delay(5000)
      )
      .subscribe({
        next: () => {
          this.cartService.clearCart();
          this.routerService.toOrders();
          this.isLoading = false;
          this.toastService.success("pedido efeuado com sucesso");
        },
        error: (error) => {
          this.isLoading = false;
          this.toastService.error("erro ao fazer pedido");
        }
      });
  }


}
