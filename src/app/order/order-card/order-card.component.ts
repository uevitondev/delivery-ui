import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  private readonly router = inject(Router);
  @Input() order: any;

  navigateToOrderDetail(orderId: string) {
    this.router.navigate(['orders/detail/', orderId]);
  }
}
