import { Routes } from '@angular/router';
import { ListStoreComponent } from './components/store/list-store/list-store.component';
import { Page403Component } from './pages/403-page/403-page.component';
import { AuthAccountPageComponent } from './pages/auth-account-page/auth-account-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrderDetailsPageComponent } from './pages/order-details-page/order-details-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { SignInPageComponent } from './pages/signin-page/signin-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup.component';
import { StorePageComponent } from './pages/store-page/store-page.component';
import { TestApiPageComponent } from './pages/testapi-page/testapi-page.component';
import { AddressEditPageComponent } from './pages/address-edit-page/address-edit-page/address-edit-page.component';

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
    path: "testapi",
    component: TestApiPageComponent
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
