import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ICart, ICartItem, ICartTotals } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart$: Observable<ICart>;
  cartTotals$: Observable<ICartTotals>;
  today: Date = new Date();
  cartItems = [

  ];

  getItems: any = [

  ];

  loadedCartItem = [

  ];
  localItem: any = [

  ];


  cartTotal = 0;
  countTotal = 0;
  constructor(private router: Router,
    private toastr: ToastrService, private cartService: CartService) { }

  ngOnInit() {
    this.CartDetails();
    this.cart$ = this.cartService.cart$;
    this.cartTotals$ = this.cartService.cartTotal$;
    console.log(this.cart$);
  }

  removeCartItem(item: ICartItem) {
    this.cartService.removeItemFromCart(item);
  }

  incrementItemQuantity(item: ICartItem) {
    this.cartService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: ICartItem) {
    this.cartService.decrementItemQuantity(item);
  }

  onWarning() {
    this.toastr.warning("Giỏ hàng của bạn chưa có sản phẩm nào", "Cảnh báo")
  }

  CartDetails() {
    if (localStorage.getItem('localStore')) {
      this.getItems = JSON.parse(localStorage.getItem('localStore'));
      this.countItem();
      this.calcTotal();
    }
  }

  showToastr() {
    this.toastr.success("Thêm vào giỏ hàng thành công", "Thông báo");
  }


  calcTotal() {
    this.cartTotal = 0
    this.getItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  countItem() {
    this.countTotal = 0
    this.getItems.forEach(() => {
      this.countTotal += 1
    })
  }

  getItemData() {
    return this.getItems;
  }

  showCartItem() {
    console.log(this.getItems);
  }



  onClearCart() {
    localStorage.clear();
    this.getItems = []
    this.countItem();
    this.calcTotal();
  }

  onDeleteItem(id) {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
      this.getItems = JSON.parse(localStorage.getItem('localStore'));
      for (let i = 0; i < this.getItems.length; i++) {
        if (this.getItems[i].productId === id) {
          this.getItems.splice(i, 1);
          localStorage.setItem('localStore', JSON.stringify(this.getItems));
          this.countItem();
          this.calcTotal();
        }
      }
    }
  }

}
