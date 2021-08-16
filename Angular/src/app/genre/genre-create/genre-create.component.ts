import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { genreCreationDTO } from '../genre.model';
import { GenresService } from '../genre.service';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit {

  constructor(private toastr: ToastrService, private genresService: GenresService) { }

  ngOnInit(): void {

  }

  showCreateToastr() {
    this.toastr.success("Tạo thành công", "Thông báo");
  }

  saveChanges(genreCreationDTO: genreCreationDTO) {
    this.genresService.create(genreCreationDTO).subscribe(() => {
      this.showCreateToastr();
    });
  }

}
