import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { GenreCreateComponent } from '../genre-create/genre-create.component';
import { GenreEditComponent } from '../genre-edit/genre-edit.component';
import { genreCreationDTO } from '../genre.model';
import { GenresService } from '../genre.service';

@Component({
  selector: 'app-genre-index',
  templateUrl: './genre-index.component.html',
  styleUrls: ['./genre-index.component.css']
})
export class GenreIndexComponent implements OnInit {


  listdata: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  isFetching = false;
  page = 1;
  nameSearch: string = '';
  constructor(private genresService: GenresService, private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchGenres();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GenreCreateComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchGenres();
    });
  }

  fetchGenres() {
    this.genresService.getAll().subscribe((response) => {
      this.listdata = new MatTableDataSource(response);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator;
    })
  }

  openUpdateDialog(element) {
    const dialogRef = this.dialog.open(GenreEditComponent, {
      width: '400px',
      data: {
        element
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchGenres();
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
    this.genresService.delete(index).subscribe(() => {
      console.log("Bạn đã xóa thành công!!!");
    })
  }

}
