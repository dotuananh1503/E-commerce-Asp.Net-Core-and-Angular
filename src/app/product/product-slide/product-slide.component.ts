import { Component, Input, OnInit } from '@angular/core';
import { bookDTO } from 'src/app/book/book.model';
import SwiperCore, {
  Navigation, Autoplay
} from "swiper/core";

// install Swiper components
SwiperCore.use([
  Navigation, Autoplay
]);

@Component({
  selector: 'app-product-slide',
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css']
})
export class ProductSlideComponent implements OnInit {

  constructor() { }

  @Input()
  books;
  ngOnInit() {
  }

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    //
    1024: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  };


}
