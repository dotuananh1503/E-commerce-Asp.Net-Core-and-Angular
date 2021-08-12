import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import AOS from 'aos';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [

  ];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    AOS.init();
/*     this.productService.fetchProducts().subscribe(productData => {
      this.products = productData;
    }); */

 /*    this.products = this.productService.getProducts(); */
  }

}
