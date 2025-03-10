import { Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';

export const ORDER_ROUTES: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'detail/:orderId', component: OrderDetailComponent },
];
