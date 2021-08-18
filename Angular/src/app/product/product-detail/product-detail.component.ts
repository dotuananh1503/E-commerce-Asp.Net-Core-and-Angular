import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product.model';
import { BookService } from 'src/app/book/book.service';
import { bookDTO } from 'src/app/book/book.model';
import { CartService } from 'src/app/cart/cart.service';
import { ViewportScroller } from '@angular/common';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { RatingService } from 'src/app/utilities/rating.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from 'src/app/utilities/rating/rating.component';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  quantity = 1;
  ratingValue: any;
  book: bookDTO;
  relatedBook;
  leftProduct = 0;
  isAuthorized;
  releaseDate: Date;
  today: Date = new Date();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private route: ActivatedRoute,
    private booksService: BookService,
    private cartService: CartService,
    private viewportScroller: ViewportScroller,
    public securityService: SecurityService,
    private ratingService: RatingService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.booksService.getById(params.id).subscribe((book) => {
        console.log(book);
        this.book = book;
        this.galleryImages = this.getImages();
        this.releaseDate = new Date(book.releaseDate);
      })
      this.booksService.getRelatedProducts(params.id).subscribe((books) => {
        this.relatedBook = books;
      })
      this.ratingService.getRateValue(params.id).subscribe(response => {
        this.ratingValue = response;
      })
      this.isAuthorized = this.securityService.isAuthenticated();
    })

    this.galleryOptions = [
      {
        width: '300px',
        height: '400px',
        imagePercent: 100,
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ]
  }

  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for(const photo of this.book.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  isReadMore = true

  showText() {
    this.isReadMore = !this.isReadMore
  }

  openDialog(id: number): void{
    const dialogRef = this.dialog.open(RatingComponent, {
      width: '600px',
      data: {
        id,
        editmode: true
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchRating();
    });
  }

  fetchRating(){
    
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  incrementItemQuantity() {
    if (this.book.quantity - this.leftProduct > 0) {
      this.quantity++;
      this.leftProduct++;
    }
    else {
      Swal.fire("Cảnh báo", "Bạn không thể thêm sản phẩm này nữa <3", "warning");
    }
  }

  decrementItemQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.leftProduct--;
    }
  }

  addItemToCart() {
    this.cartService.addItemToCart(this.book, this.quantity);
  }

}
