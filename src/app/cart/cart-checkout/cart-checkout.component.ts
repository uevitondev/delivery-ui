import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.development';
import { Address } from '../../address/address';
import { AddressCardComponent } from '../../address/address-card/address-card.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { AddressService } from '../../address/address.service';
import { AuthService } from '../../auth/auth.service';
import { ModalComponent } from '../../modal/modal.component';
import { OrderService } from '../../order/order.service';
import { PaymentListComponent } from '../../payment/payment-list/payment-list.component';
import { PaymentMethod } from '../../payment/payment-method';
import { PaymentService } from '../../payment/payment.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { ModalOverlayRef, ModalService } from '../../services/modal.service';
import { StorageService } from '../../services/storage.service';
import { Store } from '../../store/store';
import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';
import { CartitemListComponent } from '../cartitem-list/cartitem-list.component';
import { ShoppingCartRequest } from '../shopping-cart-request';

@Component({
  selector: 'app-cart-checkout',
  imports: [CommonModule, ModalComponent, AddressListComponent, PaymentListComponent, CartitemListComponent, AddressCardComponent, PortalModule, ModalComponent],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.scss',
})
export class CartCheckoutComponent implements OnInit {
  router = inject(Router);
  modalService = inject(ModalService);
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  addressService = inject(AddressService);
  paymentService = inject(PaymentService);
  authService = inject(AuthService);
  cartService = inject(CartService);
  orderService = inject(OrderService);
  errorHandlerService = inject(ErrorHandlerService);

  modalOverlayRef!: ModalOverlayRef;
  STORED_STORE = environment.STORED_STORE;
  address!: Address;
  paymentMethod!: PaymentMethod;
  store!: Store;
  cartItems!: CartItem[];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.onLoadDataCheckout();
  }


  onLoadDataCheckout() {
    this.isLoading = true;
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
        this.errorHandlerService.handleError(e);
      },
    });

    this.paymentService.getAllPaymentMethods().subscribe({
      next: (response) => {
        if (response.length >= 1) {
          this.paymentMethod = response[0];
        }
      },
      error: (e) => {
        this.errorHandlerService.handleError(e);
      },
    });
    this.cartItems = this.cartService.cartItems();
    this.isLoading = false;
  }

  setAddress(address: Address): void {
    this.address = address;
    this.modalService.close(this.modalOverlayRef);
  }

  setPaymentMethod(paymentMethod: PaymentMethod): void {
    this.paymentMethod = paymentMethod;
    this.modalService.close(this.modalOverlayRef);
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


  newOrder() {
    this.isLoading = true;

    let shoppingCartRequest: ShoppingCartRequest = {
      addressId: this.address.id,
      storeId: this.store.id,
      paymentMethodId: this.paymentMethod.id,
      cartItems: this.cartItems,
    };

    this.orderService.newOrder(shoppingCartRequest).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.isLoading = false;
        this.toastService.success('PEDIDO EFETUADO COM SUCESSO');
        this.router.navigate(['/orders']);
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }
}
