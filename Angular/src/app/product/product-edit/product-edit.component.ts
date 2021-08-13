import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Brand {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public Editor = ClassicEditor;
  loadedProduct: Product[] = [
    
  ];

  brands: Brand[] = [
    {
      value: 'Chivas', viewValue: 'Chivas'
    },
    {
      value: 'Hennessy', viewValue: 'Hennessy'
    },
    {
      value: 'Chandon', viewValue: 'Chandon'
    },
    {
      value: 'Johnnie Walker', viewValue: 'Johnnie Walker'
    },
    {
      value: 'Champagne', viewValue: 'Champagne'
    }
  ]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isFetching = false;
  nameSearch: string = '';
  searchKey: string;
  productForm: FormGroup;
  listdata: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'imagePath','productname', 'brand', 'desc', 'country', 'concentration', 'capacity', 'bottled', 'price', 'actions'];
  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.productService.fetchProducts().subscribe(productData => {
      this.loadedProduct = productData;
      this.listdata = new MatTableDataSource(this.loadedProduct);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator;
    });
    
    console.log(this.loadedProduct);
    this.initForm();
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


  private initForm(){
    let id = null;
    let productname = '';
    let desc = '';
    let imagePath = '';
    let price = null;

    this.productForm = new FormGroup({
        'id': new FormControl(null),
        'productname': new FormControl(null, Validators.required),
        'desc': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null, Validators.required),
        'price': new FormControl(null, Validators.required),
        'brand': new FormControl('Champagne', Validators.required),
        'country': new FormControl(null, Validators.required),
        'concentration': new FormControl(null, Validators.required),
        'capacity': new FormControl(null, Validators.required),
        'bottled': new FormControl(null, Validators.required)
      }
    );
  }

  onAddProducts(){
    if(this.editmode){
      this.loadedProduct[this.editIndex] = {
        productname: this.productForm.get('productname').value,
        desc: this.productForm.get('desc').value,
        imagePath: this.productForm.get('imagePath').value,
        price: this.productForm.get('price').value,
        brand: this.productForm.get('brand').value,
        country: this.productForm.get('country').value,
        concentration: this.productForm.get('concentration').value,
        capacity: this.productForm.get('capacity').value,
        bottled: this.productForm.get('bottled').value
      }
      this.editmode = false;
    }else{
      this.loadedProduct.push({
        productname: this.productForm.get('productname').value,
        desc: this.productForm.get('desc').value,
        imagePath: this.productForm.get('imagePath').value,
        price: this.productForm.get('price').value,
        brand: this.productForm.get('brand').value,
        country: this.productForm.get('country').value,
        concentration: this.productForm.get('concentration').value,
        capacity: this.productForm.get('capacity').value,
        bottled: this.productForm.get('bottled').value
      });
    }
    this.onSaveProducts();
    this.initForm();
    this.showCreateToastr();
  }

 /*  onCreateProduct(){
    this.onAddProducts();
    this.productService.createProducts(this.loadedProduct);
    this.initForm();
  } */

  onSaveProducts(){
    this.productService.saveProducts(this.loadedProduct).subscribe(loadedProduct => {
      console.log(loadedProduct);
      this.onFetchProducts();
    });
  }

  onFetchProducts(){
    this.isFetching = true;
    this.productService.fetchProducts().subscribe(productData => {
      this.loadedProduct = productData;
      this.listdata = new MatTableDataSource(this.loadedProduct);
      this.listdata.paginator = this.paginator;
      this.isFetching = false;
    });
  }

  @ViewChild('id') id: ElementRef;
  @ViewChild('productname') productname: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('imagePath') imagePath: ElementRef;
  @ViewChild('price') price: ElementRef;
  @ViewChild('brand') brand: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('concentration') concentration: ElementRef;
  @ViewChild('capacity') capacity: ElementRef;
  @ViewChild('bottled') bottled: ElementRef;

  editmode:boolean = false;
  editIndex: number;

  onEditItem(index: number){
    this.editmode = true;
    this.editIndex = index;
    console.log(this.loadedProduct[index]);
    this.productForm.setValue({
      id: this.loadedProduct[index].id,
      productname: this.loadedProduct[index].productname,
      desc: this.loadedProduct[index].desc,
      imagePath: this.loadedProduct[index].imagePath,
      price: this.loadedProduct[index].price,
      brand: this.loadedProduct[index].brand,
      country: this.loadedProduct[index].country,
      concentration: this.loadedProduct[index].concentration,
      capacity: this.loadedProduct[index].capacity,
      bottled: this.loadedProduct[index].bottled
    })
  }

  onClearProducts(){
    this.productService.deleteProducts().subscribe(() => {
      this.loadedProduct = [];
      this.onFetchProducts();
    });
  }

  onDeleteItem(id){
    if(confirm("Bạn có muốn xóa sản phẩm này không?")){
      this.loadedProduct.splice(id ,1);
      this.onSaveProducts();
      this.onFetchProducts();
      this.showUpdateToastr();
    }
  }




}
