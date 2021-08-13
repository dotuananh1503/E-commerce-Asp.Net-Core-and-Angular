import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { publisherCreationDTO } from '../publisher.model';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.css']
})
export class PublisherFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  publisherForm: FormGroup;

  @Input()
  model: publisherCreationDTO;

  @Output()
  onSaveChanges = new EventEmitter<publisherCreationDTO>();

  ngOnInit(): void {
    this.publisherForm = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      picture: '',
    });

    if (this.model !== undefined){
      this.publisherForm.patchValue(this.model);
    }
  }

  onImageSelected(image){
    this.publisherForm.get('picture').setValue(image);
  }

  changeMarkdown(content){
    this.publisherForm.get('biography').setValue(content);
  }

  saveChanges(){
    this.onSaveChanges.emit(this.publisherForm.value);
  }

}
