import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { publisherCreationDTO, publisherDTO } from '../publisher.model';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-index',
  templateUrl: './publisher-index.component.html',
  styleUrls: ['./publisher-index.component.css']
})
export class PublisherIndexComponent implements OnInit {


  loadedPublisher: publisherDTO[];
  listdata: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'picture' , 'actions'];
  isFetching = false;
  page = 1;
  pageSize = 5;
  nameSearch: string = '';
  totalAmountOfRecords;
  constructor(private publisherService: PublisherService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
      this.loadData();
  }

  loadData(){
    this.publisherService.get(this.page, this.pageSize).subscribe((response: HttpResponse<publisherDTO[]>) => {
      this.loadedPublisher = response.body;
      console.log(this.loadedPublisher);
      this.listdata = new MatTableDataSource(this.loadedPublisher);
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  updatePagination(event: PageEvent){
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
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
      this.publisherService.delete(index).subscribe(() => {
          console.log("Bạn đã xóa thành công!!!");
          this.loadData();
      })
    }
  }

}
