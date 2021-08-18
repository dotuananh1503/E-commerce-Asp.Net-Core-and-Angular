import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/checkout/checkout.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: IOrder;
  isPending = false;
  isAccepted = false;
  isShipping = false;
  isPaymentComplete = false;
  isPaymentFailed = false;
  isCancel = false;
  constructor(private orderService: OrderService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {
      this.orderService.getOrderByIdForUser(params.id).subscribe(order => {
        this.order = order;
        if(this.order.status == "Đã hủy"){
          this.isCancel = true
        }
        else if(this.order.status == "Chờ xác nhận"){
          this.isPending = true
        }
      })
    })
  }

}
