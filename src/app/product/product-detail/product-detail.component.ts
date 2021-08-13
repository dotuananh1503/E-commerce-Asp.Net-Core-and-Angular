import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product.model';
import { BookService } from 'src/app/book/book.service';
import { bookDTO } from 'src/app/book/book.model';
import { CartService } from 'src/app/cart/cart.service';
import { ViewportScroller } from '@angular/common';
import { SecurityService } from 'src/app/security/security.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  quantity = 1;
  book: bookDTO;
  relatedBook;
  isAuthorized;
  releaseDate: Date;
  today: Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private booksService: BookService,
    private cartService: CartService,
    private viewportScroller: ViewportScroller,
    public securityService: SecurityService
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.booksService.getById(params.id).subscribe((book) => {
        console.log(book);
        this.book = book;
        this.releaseDate = new Date(book.releaseDate);
      })
      this.booksService.getRelatedProducts(params.id).subscribe((books) => {
        this.relatedBook = books;
      })
      this.isAuthorized = this.securityService.isAuthenticated();
    })
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  incrementItemQuantity() {
    this.quantity++;
  }

  decrementItemQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addItemToCart() {
    this.cartService.addItemToCart(this.book, this.quantity);
  }

}
