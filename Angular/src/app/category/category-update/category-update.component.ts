import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { categoryCreationDTO, categoryDTO } from '../category.model';
import { CategoryServicce } from '../category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  constructor(
    private categoryService: CategoryServicce,
    @Inject(MAT_DIALOG_DATA) public data) { }

  model: categoryDTO;

  ngOnInit(): void {
    this.model = this.data.element
  }

  saveChanges(categoryCreationDTO: categoryCreationDTO) {
    this.categoryService.edit(this.model.id, categoryCreationDTO)
      .subscribe(() => {

      });
  }

}
