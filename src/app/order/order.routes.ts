import { Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListCustomerComponent } from './order-list-customer/order-list-customer.component';


export const ORDER_ROUTES: Routes = [
  { path: '', component: OrderListCustomerComponent },
  { path: 'detail/:orderId', component: OrderDetailComponent },
];
