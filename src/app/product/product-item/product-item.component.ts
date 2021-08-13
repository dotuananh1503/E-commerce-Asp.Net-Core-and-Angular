import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { bookDTO } from 'src/app/book/book.model';
import { CartService } from 'src/app/cart/cart.service';
import { MessengerService } from 'src/app/shared/messenger.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() book: bookDTO;
  @Input() index: number;
  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addItemToCart() {
    this.cartService.addItemToCart(this.book);
  }

  showToastr() {
    this.toastr.success("Thêm vào giỏ hàng thành công", "Thông báo");
  }

}
