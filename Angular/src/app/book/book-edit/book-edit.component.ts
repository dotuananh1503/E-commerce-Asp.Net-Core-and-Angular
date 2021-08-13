import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { bookCreationDTO, bookDTO } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { }

  model:bookDTO;

  selectedGenres: multipleSelectorModel[];
  nonSelectedGenres: multipleSelectorModel[];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
        this.bookService.putGet(params.id).subscribe((putGetDTO) => {
            this.model = putGetDTO.product;

            this.selectedGenres = putGetDTO.selectedGenres.map(genre => {
              return <multipleSelectorModel>{key: genre.id, value: genre.name}
            });
    
            this.nonSelectedGenres = putGetDTO.nonSelectedGenres.map(genre => {
              return <multipleSelectorModel>{key: genre.id, value: genre.name}
            });
        });
    });
  }

  saveChanges(bookCreationDTO: bookCreationDTO){
    this.bookService.edit(this.model.id, bookCreationDTO).subscribe(() => {
      this.router.navigate(['books/detail/' + this.model.id]);
    });
  }

}
