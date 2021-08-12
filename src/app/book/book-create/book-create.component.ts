import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { BookService } from '../book.service';
import { bookCreationDTO } from '../book.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  constructor(private booksService: BookService, private router: Router) { }

  nonSelectedGenres: multipleSelectorModel[];

  ngOnInit(): void {
    this.booksService.postGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre => {
        return <multipleSelectorModel>{key: genre.id, value: genre.name}
      });
    });
  }

  saveChanges(bookCreationDTO: bookCreationDTO){
    console.log(bookCreationDTO);
    this.booksService.create(bookCreationDTO).subscribe(() => {
      this.router.navigate(['/books']);
      console.log("POST thành công");
    })
  }

}
