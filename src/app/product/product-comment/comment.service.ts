import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class CommentService {
   
    url = "https://ng-angular-huflit-default-rtdb.asia-southeast1.firebasedatabase.app/";
    constructor(private http: HttpClient){}

    createProducts(loadedContact: any[]){
        this.http.post<{name:string}>(this.url+"comments.json", loadedContact).subscribe(loadedProduct => {
          console.log(loadedContact);
        });
    }

    saveProducts(loadedContact: any[]){
        return this.http.put(this.url+"comments.json", loadedContact);
    }
        
    fetchProducts(){
        return this.http.get(this.url+"comments.json")
        .pipe(map(productData => {
            const productsArray = [];
            for(const key in productData) {
                if(productData.hasOwnProperty(key)) {
                    productsArray.push({ ... productData[key], id: key});
                }
            }
            return productsArray;
        }))
    }

    deleteProducts(){
        return this.http.delete(this.url+"comments.json");
    }
}
