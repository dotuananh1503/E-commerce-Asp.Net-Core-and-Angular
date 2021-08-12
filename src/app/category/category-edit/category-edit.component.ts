import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { categoryCreationDTO, categoryDTO } from '../category.model';
import { CategoryServicce } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  loadedCategory: categoryCreationDTO[] = [
    
  ];
  listdata: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'name','actions'];
  isFetching = false;
  page = 1;
  nameSearch: string = '';
  categoryForm: FormGroup;
  constructor(private formBuilder: FormBuilder ,
    private categoryService: CategoryServicce, private http: HttpClient, 
    private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getCat().subscribe(productData => {
      this.loadedCategory = productData;
      this.listdata = new MatTableDataSource(this.loadedCategory);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator;
    });
    this.categoryForm = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3)]
      }]
    });
  }

  showUpdateToastr(){
    this.toastr.success("Cập nhật thành công","Thông báo");
  }

  showCreateToastr(){
    this.toastr.success("Thao tác thành công","Thông báo");
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listdata.filter = this.searchKey.trim().toLowerCase();
  }


  selectedFile: File = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
  }

  onAddCate(){
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        console.log("Đã post lên server thành công");
     });
    this.showCreateToastr();
  }

  saveChanges(category: categoryCreationDTO){
    this.categoryService.create(category).subscribe(() => {
      this.router.navigate(['/categories']);
    })
  }


 /*  onCreateProduct(){
    this.onAddProducts();
    this.productService.createProducts(this.loadedProduct);
    this.initForm();
  } */


/*   temp: News[] = [];
  onSaveNews(){
    this.newsService.saveNews(this.loadedNews).subscribe(loadedProduct => {
      console.log(loadedProduct);
      this.onFetchNews();
    });
  }

  onFetchNews(){
    this.isFetching = true;
    this.newsService.fetchNews().subscribe(productData => {
      this.loadedNews = productData;
      this.listdata = new MatTableDataSource(this.loadedNews);
      console.log(this.listdata)
      this.listdata.paginator = this.paginator;
      this.isFetching = false;
    });
  } */

  @ViewChild('name') name: ElementRef;

  editmode:boolean = false;
  editIndex: number;

  onEditItem(index: number){
    this.editmode = true;
    this.editIndex = index;
    this.categoryForm.setValue({
      name: this.loadedCategory[index].name
    })

  }

  

/*   onClearNews(){
    this.newsService.deleteNews().subscribe(() => {
      this.loadedNews = [];
      this.onFetchNews();
    });
  } */

/*   onDeleteItem(id){
    if(confirm("Bạn có muốn xóa danh mục này không?")){
      this.loadedCategory.splice(id ,1);
      this.onSaveNews();
      this.onFetchNews();
      this.showCreateToastr();
    }
  } */

}
