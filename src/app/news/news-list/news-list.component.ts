import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';
import { NewsService } from '../news.service';
import AOS from 'aos';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  newss: News[] = [];
  constructor(private newsService: NewsService) { }

  ngOnInit(): void{
    AOS.init();
    this.newsService.fetchNews().subscribe(productData => {
      this.newss = productData;
    });
  }

}
