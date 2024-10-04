import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  router = inject(Router);

  toSignIn() {
    this.router.navigate(["auth/signin"]);
  }

  toResetPassword(){
    this.router.navigate(["auth/reset-password"]);
  }
  
  toSignUp() {
    this.router.navigate(["auth/signup"]);
  }

  toSignUpVerification(email: string) {
    this.router.navigate(["auth/verification/", email]);
  }

  toHome() {
    this.router.navigate(["home"]);
  }

  toStores() {
    this.router.navigate(["stores"]);
  }

  toNewAddress() {
    this.router.navigate(["address/new"]);
  }

  toProductDetails(product: Product) {
    this.router.navigate(['product/details/', product.id]);
  }

  toCart() {
    this.router.navigate(["cart"]);
  }

  toCheckout() {
    this.router.navigate(["cart/checkout"]);
  }

  toCheckoutAddresses() {
    this.router.navigate(["cart/checkout/addresses"]);
  }

  toOrders() {
    this.router.navigate(["orders"]);
  }

  toAccount() {
    this.router.navigate(["user/account"]);
  }

  toForbidden() {
    this.router.navigate(['forbidden']);
  }

  toNotFound() {
    this.router.navigate(["notfound"]);
  }


}
