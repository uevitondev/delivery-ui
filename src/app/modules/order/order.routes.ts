import { Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';

export const ORDER_ROUTES: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'order/details/:orderId', component: OrderDetailsComponent }
];
