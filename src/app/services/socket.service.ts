import { Injectable } from "@angular/core";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { Observable } from "rxjs";
import SockJS from "sockjs-client";
import { OrderResponse } from "../order/order-response";

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private webSocketUrl = 'http://localhost:8080/ws'
  private webSocket: WebSocket = new SockJS(this.webSocketUrl);
  private stompClient: CompatClient = {} as CompatClient;

  constructor() {
    this.stompClient = Stomp.over(this.webSocket); 
  }

  getOrders(): Observable<OrderResponse> {   
    this.stompClient.connect({}, () => console.log("epa"), () => console.log("erro"));
      return new Observable(observer => {
        this.stompClient.subscribe('/app/topic/orders', (message: any) => {
          console.log("ola: ", message.body)
          observer.next(JSON.parse(message.body));
        });
      });    
  }


}



