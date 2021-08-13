import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryCreationDTO, categoryDTO } from '../category.model';
import { CategoryServicce } from '../category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryServicce,
    private router: Router) { }

  model: categoryDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryService.getById(params.id).subscribe(genre => {
        this.model = genre;
      })
    });
  }

  saveChanges(categoryCreationDTO: categoryCreationDTO){
    this.categoryService.edit(this.model.id, categoryCreationDTO)
    .subscribe(() => {
      this.router.navigate(["/categories"]);
    });
  }

}
