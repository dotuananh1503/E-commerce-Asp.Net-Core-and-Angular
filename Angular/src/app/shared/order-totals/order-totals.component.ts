import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartTotals } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {

  @Input() shippingPrice: number;
  @Input() subtotal: number;
  @Input() total: number;
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

}
