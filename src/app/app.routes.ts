import { Routes } from '@angular/router';
import { AddressEditPageComponent } from './modules/address/pages/address-edit-page/address-edit-page.component';
import { AuthAccountPageComponent } from './modules/auth/auth-account-page/auth-account-page.component';
import { SignInPageComponent } from './modules/auth/signin-page/signin-page.component';
import { SignUpPageComponent } from './modules/auth/signup-page/signup.component';
import { CartPageComponent } from './modules/cart/cart-page/cart-page.component';
import { CheckoutPageComponent } from './modules/cart/checkout-page/checkout-page.component';
import { Page403Component } from './modules/error/403-page/403-page.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { OrderDetailsPageComponent } from './modules/order/order-details-page/order-details-page.component';
import { OrdersPageComponent } from './modules/order/orders-page/orders-page.component';
import { ProductDetailsPageComponent } from './modules/product/product-details-page/product-details-page.component';
import { ListStoreComponent } from './modules/store/list-store/list-store.component';
import { StorePageComponent } from './modules/store/store-page/store-page.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: 'store',
    children: [
      { path: '', component: StorePageComponent },
      { path: 'products/details/:productId', component: ProductDetailsPageComponent },
    ],
  },
  {
    path: "stores",
    component: ListStoreComponent
  },
  {
    path: "cart",
    component: CartPageComponent
  },
  {
    path: "checkout",
    component: CheckoutPageComponent
  },
  {
    path: 'orders',
    children: [
      { path: '', component: OrdersPageComponent },
      { path: 'details/:orderId', component: OrderDetailsPageComponent }
    ],
  },
  {
    path: "signin",
    component: SignInPageComponent
  },
  {
    path: "signup",
    component: SignUpPageComponent
  },
  {
    path: "403",
    component: Page403Component
  },
  {
    path: "account",
    component: AuthAccountPageComponent
  },
  {
    path: "address/edit:addressId",
    component: AddressEditPageComponent
  }
];
