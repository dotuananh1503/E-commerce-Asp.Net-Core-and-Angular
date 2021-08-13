import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { genreCreationDTO } from '../genre.model';
import { GenresService } from '../genre.service';

@Component({
  selector: 'app-genre-index',
  templateUrl: './genre-index.component.html',
  styleUrls: ['./genre-index.component.css']
})
export class GenreIndexComponent implements OnInit {

  loadedGenres: genreCreationDTO[] = [
    
  ];
  listdata: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'name','actions'];
  isFetching = false;
  page = 1;
  nameSearch: string = '';
  constructor(private genresService: GenresService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.genresService.getAll().subscribe(productData => {
      this.loadedGenres = productData;
      this.listdata = new MatTableDataSource(this.loadedGenres);
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
      this.genresService.delete(index).subscribe(() => {
          console.log("Bạn đã xóa thành công!!!");
      })
    }
  }

}
