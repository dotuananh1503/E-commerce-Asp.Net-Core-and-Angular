import { Component, OnInit } from '@angular/core';
import { bookDTO } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: bookDTO;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(response => {
      this.books = response;
      console.log(this.books);
    })
  }

}
