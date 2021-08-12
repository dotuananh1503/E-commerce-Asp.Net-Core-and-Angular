import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { categoryCreationDTO } from '../category.model';
import { CategoryServicce } from '../category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  @Input()
  model: categoryCreationDTO;

  @Output()
  onSaveChanges: EventEmitter<categoryCreationDTO> = new EventEmitter<categoryCreationDTO>();
  
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3)]
      }]
    });

    if (this.model !== undefined){
      this.categoryForm.patchValue(this.model);
    }
  }

  saveChanges(){
    this.onSaveChanges.emit(this.categoryForm.value);
    this.showCreateToastr();
  }

  showCreateToastr(){
    this.toastr.success("Thao tác thành công","Thông báo");
  }

}
