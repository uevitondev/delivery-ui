import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [OrderListComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
