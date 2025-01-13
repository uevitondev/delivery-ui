import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Address } from '../../../core/models/address';
import { CartItem } from '../../../core/models/cart-item';
import { PaymentMethod } from '../../../core/models/payment-method';
import { ShoppingCartRequest } from '../../../core/models/shopping-cart-request';
import { Store } from '../../../core/models/store';
import { AddressService } from '../../../core/services/address.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ModalService, TemplateModalOverlayRef } from '../../../core/services/modal.service';
import { OrderService } from '../../../core/services/order.service';
import { PaymentService } from '../../../core/services/payment.service';
import { StorageService } from '../../../core/services/storage.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { AddressCardComponent } from '../../address/addresscard/addresscard.component';
import { PaymentListComponent } from '../../payment/payment-list/payment-list.component';
import { CartitemListComponent } from '../cartitem-list/cartitem-list.component';

@Component({
  selector: 'app-cart-checkout',
  imports: [
    CommonModule,
    ModalComponent,
    AddressListComponent,
    PaymentListComponent,
    CartitemListComponent,
    AddressCardComponent,
    PortalModule,
    ModalComponent
  ],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.scss'
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

  templateRef!: TemplateModalOverlayRef;
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
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO CARREGAR ENDEREÇOS");
      }
    });

    this.paymentService.getAllPaymentMethods().subscribe({
      next: (response) => {
        if (response.length >= 1) {
          this.paymentMethod = response[0];
        }
      },
      error: (e) => {
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO CARREGAR METHODOS DE PAGAMENTO");
      }
    });
    this.cartItems = this.cartService.cartItems();
    this.isLoading = false;
  }


  setAddress(address: Address): void {
    this.address = address;
    this.closeTemplateModal();
  }

  setPaymentMethod(paymentMethod: PaymentMethod): void {
    this.paymentMethod = paymentMethod;
    this.closeTemplateModal();
  }

  checkoutIsInvalid() {
    if (
      this.address === undefined ||
      //this.store === undefined ||
      this.paymentMethod === undefined ||
      this.cartItems.length < 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  public openModalAddresses(template: TemplatePortal<any>) {
    this.templateRef = this.modalService.open(template, {}, {
      hasBackdropClick: true
    });

  }

  public openModalPayments(template: TemplatePortal<any>) {
    this.templateRef = this.modalService.open(template, {}, {
      hasBackdropClick: true
    });
  }

  public closeTemplateModal() {
    this.templateRef.close();
  }


  newOrder() {
    this.isLoading = true;

    let shoppingCartRequest: ShoppingCartRequest = {
      addressId: this.address.id,
      storeId: "876a9ba4-fdf6-40bd-899a-1758e7f6523e",
      paymentMethodId: this.paymentMethod.id,
      cartItems: this.cartItems
    }

    this.orderService.newOrder(shoppingCartRequest).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.isLoading = false;
        this.toastService.success("PEDIDO EFETUADO COM SUCESSO");
        this.router.navigate(['/orders']);
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO FAZER PEDIDO");
      }
    });
  }


}
