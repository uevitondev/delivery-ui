import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  router = inject(Router);

  toHome() {
    this.router.navigate(["home"]);
  }

  toStore() {
    this.router.navigate(["store"]);
  }

  toSignIn() {
    this.router.navigate(["auth/signin"]);
  }

  toSignUp() {
    this.router.navigate(["auth/signup"]);
  }

  toOrders() {
    this.router.navigate(["orders"]);
  }

  toAccount() {
    this.router.navigate(["account"]);
  }
  
  toCart() {
    this.router.navigate(["cart"]);
  }


}
