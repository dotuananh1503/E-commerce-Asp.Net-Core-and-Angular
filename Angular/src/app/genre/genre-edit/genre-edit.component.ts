import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { genreCreationDTO, genreDTO } from '../genre.model';
import { GenresService } from '../genre.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private genresService: GenresService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  model: genreDTO;

  ngOnInit(): void {
    this.model = this.data.element;
  }

  showUpdateToastr() {
    this.toastr.success("Cập nhật thành công", "Thông báo");
  }

  saveChanges(genreCreationDTO: genreCreationDTO) {
    this.genresService.edit(this.model.id, genreCreationDTO)
      .subscribe(() => {
        this.showUpdateToastr();
      });
  }

}
