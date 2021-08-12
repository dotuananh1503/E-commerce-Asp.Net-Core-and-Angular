import { AotSummaryResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book/book.service';
import { CartService } from '../cart/cart.service';
import { News } from '../news/news.model';
import { NewsService } from '../news/news.service';
import { Product } from '../product/product.model';
import { MessengerService } from '../shared/messenger.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newsItems: News[];
  newsItemss: News[];
  @Input() newsLatest: News;
  @Input() index: number;
  constructor(private newsService: NewsService, private msg: MessengerService, private cartService: CartService,
              private toastr: ToastrService, private bookService: BookService) { }

  cartItems = [

  ];
  getItems: any = []
  temp: any = []
  ngOnInit() {
    this.loadData();
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product)
     })
    this.newsService.fetchNews().subscribe(res => {
      this.newsItems = res;
      this.newsItemss = this.newsItems.slice(0,3);
    });
    this.temp =  JSON.parse(localStorage.getItem('localStore'));
    console.log(this.temp);
    console.log(this.cartItems);
  }

  latestProducts;
  upcomingProducts;

  loadData(){
    this.bookService.getHomePageBooks().subscribe(homeDTO => {
      this.latestProducts = homeDTO.latestProducts;
      this.upcomingProducts = homeDTO.upComingProducts;
    })
  }
  
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
