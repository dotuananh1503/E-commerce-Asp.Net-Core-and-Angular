import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { genreCreationDTO } from '../genre.model';
import { GenresService } from '../genre.service';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit {

  constructor(private router: Router, private genresService: GenresService) { }

  ngOnInit(): void {
   
  }

  saveChanges(genreCreationDTO: genreCreationDTO){
    this.genresService.create(genreCreationDTO).subscribe(() => {
      this.router.navigate(['/genres']);
    });
  }

}
