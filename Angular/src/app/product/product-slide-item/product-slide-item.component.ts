import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private cartService: CartService, private toastService: ToastrService) { }

  ngOnInit() {
  }

  addItemToCart(){
    this.cartService.addItemToCart(this.book);
    this.showToastr();
  }

  showToastr() {
    this.toastService.success("Đã thêm vào giỏ hàng", "Thông báo");
  }

}
