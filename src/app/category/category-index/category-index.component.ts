import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { categoryCreationDTO } from '../category.model';
import { CategoryServicce } from '../category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {



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
  constructor(private categoryService: CategoryServicce, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.categoryService.getCat().subscribe(productData => {
      this.loadedCategory = productData;
      this.listdata = new MatTableDataSource(this.loadedCategory);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator;
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

  onDeleteItem(index){
    if(confirm("Bạn có muốn xóa không?")){
      this.categoryService.delete(index).subscribe(() => {
          console.log("Bạn đã xóa thành công!!!");
      })
    }
  }


}
