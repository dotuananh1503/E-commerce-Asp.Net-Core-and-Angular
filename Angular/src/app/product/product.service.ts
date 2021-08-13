import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "./product.model";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";


@Injectable()
export class ProductService {
    productSelected = new EventEmitter<Product>();
    private apiURL = environment.apiURL + "/categories";
    url = "https://ng-angular-huflit-default-rtdb.asia-southeast1.firebasedatabase.app/";
   constructor(private http: HttpClient){}
   
   public products: Product[] = [
/*         new Product('Nike Air Max 1 Se "Just Do It"','Giày loại 1','4.490.000đ','./../../../assets/images/shoe2.jpg'),
        new Product('Nike Air Max 90 Essential "Grape"','Giày loại 1','4.800.000đ','./../../../assets/images/shoe3.jpg'),
        new Product('Nike Wmns Air Huarache City Move','Giày loại 1','5.200.000đ','./../../../assets/images/shoe4.jpg'),
        new Product('Adidas Nmd Xr1 W "Pearl Grey"','Giày loại 1','5.750.000đ','./../../../assets/images/shoe5.jpg'),
        new Product('Nike Air Max 1 Anniversary','Giày loại 1','4.200.000đ','./../../../assets/images/shoe6.jpg'),
        new Product('The 10: Nike Air Presto "Off White"','Giày loại 1','8.000.000đ','./../../../assets/images/shoe7.jpg'),
        new Product('Nike Air Max 97 Premium','Giày loại 1','8.000.000đ','./../../../assets/images/shoe8.jpg'),
        new Product('Adidas Nmd R1 "Villa Exclusive"','Giày loại 1','7.000.000đ','./../../../assets/images/shoe9.jpg') */
      ];

    getProducts(){
        return this.products;
    }

    getProduct(index: number){
        this.fetchProducts().subscribe(productData => {
            this.products = productData;
        })
        return this.products[index];
    }

    getProductFetch(){
        this.fetchProducts().subscribe(productData => {
            this.products = productData;
        })
    }


    createProducts(loadedProduct: any[]){
        this.http.post<{name:string}>(this.url+"products.json", loadedProduct).subscribe(loadedProduct => {
          console.log(loadedProduct);
        });
    }

    saveProducts(loadedProduct: any[]){
        return this.http.put(this.url+"products.json", loadedProduct);
    }
        
    fetchProducts(){
        return this.http.get<{[key:string]:Product}>(this.url+"products.json")
        .pipe(map(productData => {
            const productsArray: Product[] = [];
            for(const key in productData) {
                if(productData.hasOwnProperty(key)) {
                    productsArray.push({ ... productData[key], id: key});
                }
            }
            return productsArray;
        }))
    }

    fetchProductsbyId(id){
        return this.http.get<Product>(this.url+"products/"+ id+".json")
    }

    getProductbyId(index: number){
        this.fetchProductsbyId(index);
        return this.products[index];
    }

    deleteProducts(){
        return this.http.delete(this.url+"products.json");
    }
}