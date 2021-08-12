import { Component, Input, OnInit, Output } from '@angular/core';
import { News } from '../news.model';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-lastest',
  templateUrl: './news-lastest.component.html',
  styleUrls: ['./news-lastest.component.css']
})
export class NewsLastestComponent implements OnInit {


  constructor(private newsService: NewsService) { }

  ngOnInit() {

  }

}
