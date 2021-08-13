import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { bookDTO } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  constructor(private booksService: BookService, private activatedRoute: ActivatedRoute) {

  }

  book: bookDTO;
  releaseDate: Date;
  today: Date = new Date();

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.booksService.getById(params.id).subscribe((book) => {
        console.log(book);
        this.book = book;
        this.releaseDate = new Date(book.releaseDate);
      })
    })
  }

}
