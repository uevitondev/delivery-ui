import { Routes } from '@angular/router';
import { AddressNewComponent } from './modules/address/address-new/address-new.component';
import { AuthPageComponent } from './modules/auth/auth-page/auth-page.component';
import { CartCheckoutComponent } from './modules/cart/cart-checkout/cart-checkout.component';
import { CartComponent } from './modules/cart/cart/cart.component';
import { ForbiddenComponent } from './modules/error/forbidden/forbidden.component';
import { NotfoundComponent } from './modules/error/notfound/notfound.component';
import { HomeComponent } from './modules/home/home/home.component';
import { OrderDetailsComponent } from './modules/order/order-details/order-details.component';
import { OrdersComponent } from './modules/order/orders/orders.component';
import { ProductDetailsComponent } from './modules/product/product-details/product-details.component';
import { ListStoreComponent } from './modules/store/list-store/list-store.component';
import { StoreHomeComponent } from './modules/store/store-home/store-home.component';
import { UserAccountComponent } from './modules/user/user-account/user-account.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "stores",
    component: ListStoreComponent
  },
  {
    path: 'store',
    component: StoreHomeComponent
  },

  {
    path: 'product/details/:productId',
    component: ProductDetailsComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "cart/checkout",
    component: CartCheckoutComponent
  },
  {
    path: 'orders',
    children: [
      { path: '', component: OrdersComponent },
      { path: 'details/:orderId', component: OrderDetailsComponent }
    ],
  },
  {
    path: "address/new",
    component: AddressNewComponent
  },
  {
    path: "auth/signin",
    component: AuthPageComponent
  },
  {
    path: "auth/reset-password",
    component: AuthPageComponent
  },
  {
    path: "auth/signup",
    component: AuthPageComponent
  },
  {
    path: "auth/verification/:email",
    component: AuthPageComponent
  },
  {
    path: "forbidden",
    component: ForbiddenComponent
  },
  {
    path: "notfound",
    component: NotfoundComponent
  },
  {
    path: "user/account",
    component: UserAccountComponent
  }
];
