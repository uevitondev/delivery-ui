import { Component } from '@angular/core';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-details-page',
  standalone: true,
  imports: [OrderDetailsComponent],
  templateUrl: './order-details-page.component.html',
  styleUrl: './order-details-page.component.scss'
})
export class OrderDetailsPageComponent {

}
