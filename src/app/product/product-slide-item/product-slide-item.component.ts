import { Component, Input, OnInit } from '@angular/core';
import { bookDTO } from 'src/app/book/book.model';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-slide-item',
  templateUrl: './product-slide-item.component.html',
  styleUrls: ['./product-slide-item.component.css']
})
export class ProductSlideItemComponent implements OnInit {

  @Input() book: bookDTO;
  @Input() index: number;
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addItemToCart(){
    this.cartService.addItemToCart(this.book);
  }

}
