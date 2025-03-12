import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth-guard';
import { OrderListStoreComponent } from '../order/order-list-store/order-list-store.component';
import { StoreFormComponent } from '../store/store-form/store-form.component';
import { StoreManagementComponent } from '../store/store-management/store-management.component';
import { SellerOverviewComponent } from './seller-overview/seller-overview.component';
import { SellerStoresComponent } from './seller-stores/seller-stores.component';

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
    component: SellerStoresComponent,
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
