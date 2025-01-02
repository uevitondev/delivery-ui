import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { HomeComponent } from './modules/home/home/home.component';
import { StoreHomeComponent } from './modules/store/store-home/store-home.component';

export const APP_ROUTES: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "home/:storeName", component: StoreHomeComponent },


  { path: "auth", loadChildren: () => import('./modules/auth/auth.routes').then(r => r.AUTH_ROUTES) },
  { path: "stores", loadChildren: () => import('./modules/store/store.routes').then(r => r.STORE_ROUTES) },
  { path: 'products', loadChildren: () => import('./modules/product/product.routes').then(r => r.PRODUCT_ROUTES) },
  { path: "orders", loadChildren: () => import('./modules/order/order.routes').then(r => r.ORDER_ROUTES), canActivate: [AuthGuard] },
  { path: "address", loadChildren: () => import('./modules/address/address.routes').then(r => r.ADDRESS_ROUTES), canActivate: [AuthGuard] },
  { path: "user/account", loadChildren: () => import('./modules/user/user.routes').then(r => r.USER_ROUTES), canActivate: [AuthGuard] },
  { path: "cart", loadChildren: () => import('./modules/cart/cart.routes').then(r => r.CART_ROUTES) },
  { path: "error", loadChildren: () => import('./modules/error/error.routes').then(r => r.ERROR_ROUTES) },
];
