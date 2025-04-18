import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Store } from '../../store/store';
import { OrderCardComponent } from "../order-card/order-card.component";
import { OrderResponse } from '../order-response';
import { OrderService } from '../order.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-order-list-store',
  imports: [RouterModule, OrderCardComponent],
  templateUrl: './order-list-store.component.html',
  styleUrl: './order-list-store.component.scss',
})
export class OrderListStoreComponent implements OnInit {

  @Input() store!: Store;
  orders: OrderResponse[] = [];

  private readonly orderService = inject(OrderService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  private webSocketUrl = environment.WEBSOCKET_API_URL;


  ngOnInit(): void {
    this.onLoadOrdersByStore();
    const webSocket: WebSocket = new SockJS(this.webSocketUrl);
    let stompClient: CompatClient = {} as CompatClient;
    stompClient = Stomp.over(webSocket);
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe('/topic/orders', (message: any) => {
          console.log("novo pedido detectado no socket, atualizar lista de pedidos: ", message.body);
          this.onLoadOrdersByStore();
        });
      }
    );
  }

  onLoadOrdersByStore() {
    this.orderService.getAllByStore(this.store.id).subscribe({
      next: (response) => {
        console.log("atualizando pedidos");
        this.orders = response;

      },
      error: (e) => {
       this.errorHandlerService.handleError(e); 
      }
    })
  }



}
