import { Routes } from '@angular/router';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { AuthGuard } from './guards/auth-guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { StoreHomeComponent } from './store/store-home/store-home.component';

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
      import('./seller/seller.routes').then((r) => r.SELLER_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SELLER'] },
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('./store/store.routes').then((r) => r.STORE_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.routes').then((r) => r.PRODUCT_ROUTES),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order/order.routes').then((r) => r.ORDER_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
  },
  {
    path: 'address',
    loadChildren: () =>
      import('./address/address.routes').then((r) => r.ADDRESS_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
  },
  {
    path: 'user/account',
    loadChildren: () =>
      import('./user/user.routes').then((r) => r.USER_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER', 'ROLE_SELLER'] },
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.routes').then((r) => r.CART_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
  },
  {
    path: '',
    loadChildren: () =>
      import('./error/error.routes').then((r) => r.ERROR_ROUTES),
  },
  { path: '**', component: NotfoundComponent },
];
