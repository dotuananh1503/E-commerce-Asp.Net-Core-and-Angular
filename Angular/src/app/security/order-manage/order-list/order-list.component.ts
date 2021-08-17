import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/checkout/checkout.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: IOrder;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrderForUser().subscribe(order => {
      this.orders = order;
      console.log(this.orders);
    })
  }

}
