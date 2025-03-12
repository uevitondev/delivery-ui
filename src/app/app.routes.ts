import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { SellerDashboardComponent } from './domains/seller/seller-dashboard/seller-dashboard.component';
import { StoreHomeComponent } from './domains/store/store-home/store-home.component';
import { NotfoundComponent } from './modules/error/notfound/notfound.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
  },
  { path: 'home/:storeName', component: StoreHomeComponent },
  {
    path: 'seller',
    component: SellerDashboardComponent,
    loadChildren: () =>
      import('./domains/seller/seller.routes').then((r) => r.SELLER_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SELLER'] },
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./domains/auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('./domains/store/store.routes').then((r) => r.STORE_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./domains/product/product.routes').then((r) => r.PRODUCT_ROUTES),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./domains/order/order.routes').then((r) => r.ORDER_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
  },
  {
    path: 'address',
    loadChildren: () =>
      import('./domains/address/address.routes').then((r) => r.ADDRESS_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
  },
  {
    path: 'user/account',
    loadChildren: () =>
      import('./domains/user/user.routes').then((r) => r.USER_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER', 'ROLE_SELLER'] },
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./domains/cart/cart.routes').then((r) => r.CART_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/error/error.routes').then((r) => r.ERROR_ROUTES),
  },
  { path: '**', component: NotfoundComponent },
];
