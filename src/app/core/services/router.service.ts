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

  toSignUp() {
    this.router.navigate(["auth/signup"]);
  }

  toSignUpVerification(email: string) {
    this.router.navigate(["auth/signup/verification/", email]);
  }

  toHome() {
    this.router.navigate(["home"]);
  }

  toHomeStore(storeName: string) {
    this.router.navigate(['home/', storeName]);
  }

  toStores() {
    this.router.navigate(["stores"]);
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
