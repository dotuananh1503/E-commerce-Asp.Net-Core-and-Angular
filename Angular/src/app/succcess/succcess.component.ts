import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../_checkout/checkout.model';

@Component({
  selector: 'app-succcess',
  templateUrl: './succcess.component.html',
  styleUrls: ['./succcess.component.css']
})
export class SucccessComponent implements OnInit {

  order: IOrder;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if(state){
      this.order = state as IOrder;
    }
   }

  ngOnInit() {
  }

}
