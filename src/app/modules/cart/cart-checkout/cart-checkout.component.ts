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
import { PaymentMethod } from '../../../core/models/payment-method';
import { PaymentService } from '../../../core/services/payment.service';

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
  paymentService = inject(PaymentService);
  cartService = inject(CartService);
  orderService = inject(OrderService);

  address!: Address;
  paymentMethod!: PaymentMethod;
  store!: Store;
  cartItems!: CartItem[];

  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadCheckoutStore();
  }

  loadCheckoutStore() {
    let storedStore = this.storageService.get(this.STORED_STORE);
    if (storedStore) {
      this.store = storedStore;
    }
    this.addressService.getAllByUser().subscribe({
      next: (response) => {
        if (response.length >= 1) {
          this.address = response[0];
        }
      },
      error: (e) => {
        throw new Error(e);
      }
    });

    this.paymentService.getAllPaymentMethods().subscribe({
      next: (response) => {
        if (response.length >= 1) {
          this.paymentMethod = response[0];
        }
      },
      error: (e) => {
        throw new Error(e);
      }
    });
    this.cartItems = this.cartService.cartItems();
  }

  selectAddress(selectedAddress: Address): void {
    this.address = selectedAddress;
  }

  selectPaymentMethod(selectedPaymentMethod: PaymentMethod): void {
    this.paymentMethod = selectedPaymentMethod;
  }

  checkoutIsInvalid() {
    if (
      this.address === undefined ||
      this.store === undefined ||
      this.paymentMethod === undefined ||
      this.cartItems.length < 1
    ) {
      return true;
    } else {
      return false;
    }
  }


  saveOrder() {
    this.isLoading = true;

    let shoppingCartRequest: ShoppingCartRequest = {
      addressId: this.address.id,
      storeId: this.store.id,
      paymentMethod: this.paymentMethod.name,
      cartItems: this.cartItems
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
          this.toastService.success("PEDIDO EFETUADO COM SUCESSO");
        },
        error: (e) => {
          this.isLoading = false;
          this.toastService.error("ERRO AO REALIZAR PEDIDO");
          throw new Error(e);
        }
      });
  }


}
