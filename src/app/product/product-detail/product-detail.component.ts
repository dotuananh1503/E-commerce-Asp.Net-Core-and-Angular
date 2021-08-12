import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import * as $ from 'jquery';
import { CommentService } from '../product-comment/comment.service';
import { MessengerService } from 'src/app/shared/messenger.service';
import { BookService } from 'src/app/book/book.service';
import { bookDTO } from 'src/app/book/book.model';
import { CartService } from 'src/app/cart/cart.service';
import { ICartItem } from 'src/app/cart/cart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  quantity = 1;
  comments = [];
  book: bookDTO;
  releaseDate: Date;
  today: Date = new Date();
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private booksService: BookService,
    private cartService: CartService
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.booksService.getById(params.id).subscribe((book) => {
        console.log(book);
        this.book = book;
        this.releaseDate = new Date(book.releaseDate);
      })
    })
    this.commentService.fetchProducts().subscribe(res => {
      this.comments = res;
      console.log(this.comments)
    })
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
