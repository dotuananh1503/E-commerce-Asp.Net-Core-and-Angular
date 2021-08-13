import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { News } from '../news.model';
import { NewsService } from '../news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  public Editor = ClassicEditor;
  loadedNews: News[] = [
    
  ];
  listdata: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'imageNews', 'title','author', 'date', 'content', 'actions'];
  isFetching = false;
  page = 1;
  nameSearch: string = '';
  newsForm: FormGroup;
  constructor(private newsService: NewsService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.newsService.fetchNews().subscribe(productData => {
      this.loadedNews = productData;
      this.listdata = new MatTableDataSource(this.loadedNews);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator;
    });
    console.log(this.loadedNews);
    this.initForm();
  }

  private initForm(){
    let id = null;
    let title = '';
    let desc = '';
    let imagePath = '';
    let price = null;

    this.newsForm = new FormGroup({
        'id': new FormControl(null),
        'title': new FormControl(null, Validators.required),
        'author': new FormControl(null, Validators.required),
        'date': new FormControl(null, Validators.required),
        'content': new FormControl(null, Validators.required),
        'imageNews': new FormControl(null, Validators.required)
      }
    );
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
  url = "https://ng-angular-huflit-default-rtdb.asia-southeast1.firebasedatabase.app/";
  onUploadFile(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(this.url, fd).subscribe(res => {
      console.log(res)
    })
  }

  onAddNews(){
    if(this.editmode){
      this.loadedNews[this.editIndex] = {
        title: this.newsForm.get('title').value,
        author: this.newsForm.get('author').value,
        date: this.newsForm.get('date').value,
        content: this.newsForm.get('content')?.value,
        imageNews: this.newsForm.get('imageNews').value,
      }
      this.editmode = false;
    }else{
      this.loadedNews.push({
        title: this.newsForm.get('title').value,
        author: this.newsForm.get('author').value,
        date: this.newsForm.get('date').value,
        content: this.newsForm.get('content').value,
        imageNews: this.newsForm.get('imageNews').value,
      });
    }
    this.onSaveNews();
    this.showCreateToastr();
    //this.onFetchNews();
  }

 /*  onCreateProduct(){
    this.onAddProducts();
    this.productService.createProducts(this.loadedProduct);
    this.initForm();
  } */


  temp: News[] = [];
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
  }

  @ViewChild('id') id: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('author') author: ElementRef;
  @ViewChild('date') date: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('imageNews') imageNews: ElementRef;


  editmode:boolean = false;
  editIndex: number;

  onEditItem(index: number){
    this.editmode = true;
    this.editIndex = index;
    console.log(this.loadedNews[index]);
    this.newsForm.setValue({
      id: this.loadedNews[index].id,
      title: this.loadedNews[index].title,
      author: this.loadedNews[index].author,
      date: this.loadedNews[index].date,
      imageNews: this.loadedNews[index].imageNews,
      content: this.loadedNews[index].content
    })
  }

  onClearNews(){
    this.newsService.deleteNews().subscribe(() => {
      this.loadedNews = [];
      this.onFetchNews();
    });
  }

  onDeleteItem(id){
    if(confirm("Bạn có muốn xóa tin này không?")){
      this.loadedNews.splice(id ,1);
      this.onSaveNews();
      this.onFetchNews();
      this.showCreateToastr();
    }
  }

}
