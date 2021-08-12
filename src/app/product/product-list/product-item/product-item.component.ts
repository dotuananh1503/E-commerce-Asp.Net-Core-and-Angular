import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { MessengerService } from 'src/app/shared/messenger.service';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  constructor( private productService: ProductService, private msg: MessengerService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
      //this.productService.getProduct(this.index);
  }

  handleAddToCart() {
    this.msg.sendMsg(this.product);
  }
  cartItems = [

  ];
  getItems: any = []

  addProductToCart(product: Product) {
    //var checkLocalStore = JSON.parse(localStorage.getItem('localStore') || '[]');
    if(localStorage.getItem('localStore')){
      this.getItems =  JSON.parse(localStorage.getItem('localStore'));
    }
    let productExist = false;
    if(this.getItems.length != 0) {
      if(this.cartItems.length == 0) {
        for(let i = 0; i < this.getItems.length; i++) {
          this.cartItems.push(this.getItems[i]);
        }
      }
      else {
        
        for(let i in this.cartItems) {
          if(this.cartItems[i].productId === product.id) {
            this.cartItems[i].qty++
            productExist = true;
            break;
          }
        }
    
        if(!productExist) {
          this.cartItems.push({
            productId: product.id,
            productName: product.productname,
            productImagePath: product.imagePath,
            qty: 1,
            price: product.price
          })
        }
      }
    }
    else {
        this.cartItems.push({
          productId: product.id,
          productName: product.productname,
          productImagePath: product.imagePath,
          qty: 1,
          price: product.price
        })
    } 

    localStorage.setItem('localStore',JSON.stringify(this.cartItems) || '[]');
    console.log(this.cartItems);

    
    this.showToastr();

/*     this.cartService.createProducts(this.cartItems) */

  }

  showToastr(){
    this.toastr.success("Thêm vào giỏ hàng thành công","Thông báo");
  }

}
