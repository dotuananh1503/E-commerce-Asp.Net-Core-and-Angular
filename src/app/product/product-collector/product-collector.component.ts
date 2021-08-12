import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { query } from '@angular/animations';


@Component({
  selector: 'app-product-collector',
  templateUrl: './product-collector.component.html',
  styleUrls: ['./product-collector.component.css']
})
export class ProductCollectorComponent implements OnInit {

  loadedProduct:any= [];
  arrays:Product[] = [];
  wines:any;
  filterWines: any;

  /// filter-able properties
  brands: string;
  price: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.fetchProducts().subscribe(item => {
          this.loadedProduct = item;
          this.arrays = item;
      })
  }

  checkBoxArray:any = [
     {
        id: 1000000,
        type: "checkbox",
        price1: 1000000,
        price2: 1500000
     },
     {
        id: 1500000,
        type: "checkbox",
        price1: 1500000,
        price2: 2000000,
     },
     {
        id: 2000000,
        type: "checkbox",
        price1: 2000000,
        price2: 2500000
     },
     {
        id: 2500000,
        type: "checkbox",
        price1: 2500000,
        price2: 3000000
     }
  ]

  tempArray:any = [];
  newArray:any = [];
  onChange(event:any) {
    if(event.target.checked){
        console.log(event.target.value)
        this.loadedProduct = [];
        this.tempArray = this.arrays.filter((e:Product) => e.price >= parseInt(event.target.value) && e.price < parseInt(event.target.value) + 500000);
        console.log(this.tempArray)
        this.newArray.push(this.tempArray);
        for(let i = 0; i < this.newArray.length; i++){
            var firstArray = this.newArray[i];
            this.loadedProduct = [];
            for(let i = 0; i< firstArray.length; i++){
              var obj = firstArray[i];
              this.loadedProduct.push(obj);
            }
        }
    }
    else {
        this.productService.fetchProducts().subscribe(item => {
            this.loadedProduct = item;
        })
    }
  }

}
