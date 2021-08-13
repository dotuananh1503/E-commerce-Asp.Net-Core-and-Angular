import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genreCreationDTO } from '../genre.model';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.css']
})
export class GenreFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()
  model: genreCreationDTO;

  genreForm: FormGroup;

  @Output()
  onSaveChanges: EventEmitter<genreCreationDTO> = new EventEmitter<genreCreationDTO>();

  ngOnInit(): void {
    this.genreForm = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3)]
      }]
    });

    if (this.model !== undefined){
      this.genreForm.patchValue(this.model);
    }

  }

  saveChanges(){
    this.onSaveChanges.emit(this.genreForm.value);
  }

}
