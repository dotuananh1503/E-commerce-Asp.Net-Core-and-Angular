import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { bookCreationDTO, bookDTO } from '../book.model';
import { BookService } from '../book.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private booksService: BookService) { }

  form: FormGroup
  public Editor = ClassicEditor;

  @Input()
  model: bookDTO

  @Output()
  onSaveChanges = new EventEmitter<bookCreationDTO>();

  @Input()
  nonSelectedGenres: multipleSelectorModel[] = [];

  @Input()
  selectedGenres: multipleSelectorModel[] = [];

  selectCategories: multipleSelectorModel[];
  selectPublishers: multipleSelectorModel[];

  ngOnInit(): void {
    this.booksService.postGet().subscribe(response => {
      this.selectCategories = response.categories.map(category => {
        return <multipleSelectorModel>{key: category.id, value: category.name}
      });
      this.selectPublishers = response.publishers.map(publisher => {
        return <multipleSelectorModel>{key: publisher.id, value: publisher.name}
      });
    });
    this.form = this.formBuilder.group({
      name: ['',{
        validators: [Validators.required]
      }],
      size: '',
      price: '',
      cover: '',
      pages: '',
      quantity: '',
      content: '',
      author: '',
      translators: '',
      releaseDate: '',
      productImage: '',
      CategoryId: '',
      PublisherId: '',
      genresIds: '',
    });

    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(file: File){
    this.form.get('productImage').setValue(file);
  }

  saveChanges(){
    const genresIds = this.selectedGenres.map(value => value.key);
    this.form.get('genresIds').setValue(genresIds);
    this.onSaveChanges.emit(this.form.value);
  }

}
