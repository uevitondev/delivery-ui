import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [OrderListComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {

}
