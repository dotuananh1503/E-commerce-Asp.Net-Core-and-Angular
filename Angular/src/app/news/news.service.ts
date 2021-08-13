import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { News } from "./news.model";
import { map } from "rxjs/operators";

@Injectable()
export class NewsService {
    newsSelected = new EventEmitter<News>();
    url = "https://ng-angular-huflit-default-rtdb.asia-southeast1.firebasedatabase.app/";
    
    constructor(private http: HttpClient){

    }

    private newss: News[] = [
/*         new News('Addidas Falcon nổi bật mùa hè với phối màu Color block','Đỗ Tuấn Anh','Thứ 3, 2-6-2021','Cuối tháng 5, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục...','./../../../assets/images/saucony-aya-runner-s70460-1-2_78757fcbd17740eb8a58e45e46b7d51e_grande.jpg'),
        new News('Addidas Falcon nổi bật mùa hè với phối màu Color block','Đỗ Tuấn Anh','Thứ 3, 2-6-2021','Cuối tháng 6, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục...','./../../../assets/images/saucony-aya-runner-s70460-1-2_78757fcbd17740eb8a58e45e46b7d51e_grande.jpg'),
        new News('Addidas Falcon nổi bật mùa hè với phối màu Color block','Đỗ Tuấn Anh','Thứ 3, 2-6-2021','Cuối tháng 7, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục...','./../../../assets/images/adidas-falcon-multi-wmns-release-info-0_38dc49ba627140458cccf3450312481d_grande.jpg'),
        new News('Addidas Falcon nổi bật mùa hè với phối màu Color block','Đỗ Tuấn Anh','Thứ 3, 2-6-2021','Cuối tháng 8, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục...','./../../../assets/images/nike-vapormax-plus-ao4550_900-5__1__45b7352176834c5d9bbcc9af91132edc_grande.jpg'),
        new News('Addidas Falcon nổi bật mùa hè với phối màu Color block','Đỗ Tuấn Anh','Thứ 3, 2-6-2021','Cuối tháng 9, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục...','./../../../assets/images/saucony-aya-runner-s70460-1-2_78757fcbd17740eb8a58e45e46b7d51e_grande.jpg') */
    ];

    newsLatest: News[] = [this.newss[this.newss.length - 3],this.newss[this.newss.length - 2],this.newss[this.newss.length - 1]];

    getNewss(){
        return this.newss;
    }

    getNews(index: number){
        return this.newss[index];
    }

    getLatestNews() {
        return this.newsLatest;
    }

    createNews(loadedProduct: any[]){
        this.http.post<{name:string}>(this.url+"news.json", loadedProduct).subscribe(loadedProduct => {
          console.log(loadedProduct);
        });
    }

    createNewsImg(file: any){
        this.http.post(this.url+"images.json", file).subscribe(loadedProduct => {
            console.log(loadedProduct);
          });
    }

    saveNews(loadedProduct: any[]){
        return this.http.put(this.url+"news.json", loadedProduct);
    }
        
    fetchNews(){
        return this.http.get<{[key:string]:News}>(this.url+"news.json")
        .pipe(map(productData => {
            const productsArray: News[] = [];
            for(const key in productData) {
                if(productData.hasOwnProperty(key)) {
                    productsArray.push({ ... productData[key], id: key});
                }
            }
            return productsArray;
        }))
    }

    fetchNewsbyId(id){
        return this.http.get<News>(this.url+"news/"+ id+".json")
    }

    getNewsbyId(index: number){
        this.fetchNewsbyId(index);
        return this.newss[index];
    }

    deleteNews(){
        return this.http.delete(this.url+"news.json");
    }
}