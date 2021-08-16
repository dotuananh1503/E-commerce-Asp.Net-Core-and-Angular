import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { categoryCreationDTO } from '../category.model';
import { CategoryServicce } from '../category.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';

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
  displayedColumns: string[] = ['id', 'name', 'actions'];
  isFetching = false;
  page = 1;
  nameSearch: string = '';
  categoryForm: FormGroup;
  constructor(private categoryService: CategoryServicce,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.categoryService.getCat().subscribe(productData => {
      this.listdata = new MatTableDataSource(productData);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchCat();
    });
  }

  fetchCat() {
    this.categoryService.getCat().subscribe((response) => {
      this.listdata = new MatTableDataSource(response);
    })
  }

  openUpdateDialog(element) {
    const dialogRef = this.dialog.open(CategoryUpdateComponent, {
      width: '400px',
      data: {
        element
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchCat();
    });
  }

  showUpdateToastr() {
    this.toastr.success("Cập nhật thành công", "Thông báo");
  }

  showCreateToastr() {
    this.toastr.success("Thao tác thành công", "Thông báo");
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listdata.filter = this.searchKey.trim().toLowerCase();
  }

  onDeleteItem(index) {
    this.categoryService.delete(index).subscribe(() => {
      this.fetchCat();
    })
  }


}
