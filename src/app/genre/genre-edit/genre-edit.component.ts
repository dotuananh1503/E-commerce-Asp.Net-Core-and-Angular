import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genreCreationDTO, genreDTO } from '../genre.model';
import { GenresService } from '../genre.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private genresService: GenresService,
    private router: Router) { }

  model: genreDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.genresService.getById(params.id).subscribe(genre => {
        this.model = genre;
      })
    });
  }

  saveChanges(genreCreationDTO: genreCreationDTO){
    this.genresService.edit(this.model.id, genreCreationDTO)
    .subscribe(() => {
      this.router.navigate(["/genres"]);
    });
  }

}
