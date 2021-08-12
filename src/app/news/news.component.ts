import { Component, OnInit } from '@angular/core';
import { News } from './news.model';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  selectedNews: News;

  ngOnInit(): void {
      this.newsService.newsSelected.subscribe((news: News) => {
          this.selectedNews = news;
      });
  }

}
