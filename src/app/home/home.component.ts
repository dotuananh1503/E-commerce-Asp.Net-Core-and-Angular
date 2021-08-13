import { AotSummaryResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book/book.service';
import { CartService } from '../cart/cart.service';
import { News } from '../news/news.model';
import { NewsService } from '../news/news.service';
import SwiperCore, {
  Navigation, Autoplay
} from "swiper/core";

// install Swiper components
SwiperCore.use([
  Navigation, Autoplay
]);

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
  constructor(private newsService: NewsService, private cartService: CartService,
    private toastr: ToastrService, private bookService: BookService) { }

  ngOnInit() {
    this.loadData();
    /*     this.newsService.fetchNews().subscribe(res => {
          this.newsItems = res;
          this.newsItemss = this.newsItems.slice(0, 3);
        }); */
  }

  latestProducts;
  upcomingProducts;

  loadData() {
    this.bookService.getHomePageBooks().subscribe(homeDTO => {
      this.latestProducts = homeDTO.latestProducts;
      this.upcomingProducts = homeDTO.upComingProducts;
    })
  }
  showToastr() {
    this.toastr.success("Thêm vào giỏ hàng thành công", "Thông báo");
  }

  breakpoints = {
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
