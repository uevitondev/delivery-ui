import { Routes } from '@angular/router';
import { OrderListStoreComponent } from '../order/order-list-store/order-list-store.component';
import { StoreFormComponent } from '../store/store-form/store-form.component';
import { StoreManagementComponent } from '../store/store-management/store-management.component';
import { SellerOverviewComponent } from './seller-overview/seller-overview.component';
import { StoreListSellerComponent } from './store-list-seller/store-list-seller.component';
import { AuthGuard } from '../guards/auth-guard';

export const SELLER_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard/overview', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard/overview' },
  { path: 'dashboard/overview', component: SellerOverviewComponent },
  { path: 'order-management', component: SellerOverviewComponent },
  {
    path: 'orders',
    component: OrderListStoreComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SELLER'] },
  },
  {
    path: 'stores',
    component: StoreListSellerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SELLER'] },
  },
  {
    path: 'stores/new',
    component: StoreFormComponent,
  },
  {
    path: 'stores/:storeId',
    component: StoreManagementComponent
  },

  { path: 'analytics', component: SellerOverviewComponent },
];
