import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { News } from '../news.model';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsItem: News;
  id: number;
  constructor(private newsService: NewsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
/*     this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.newsItem = this.newsService.getNews(this.id);
      }
    ) */
    this.route.paramMap.subscribe(param => {
      let pid = param.get('id')
      this.newsService.fetchNewsbyId(param.get('id')).subscribe(res => {
        //console.log(res);
        this.newsItem = res;
      })
    })
  }

}
