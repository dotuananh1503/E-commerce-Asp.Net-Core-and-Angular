import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { formatDateFormData } from "../utilities/utils";
import { bookCreationDTO, bookDTO, BookPostGetDTO, BookPutGetDTO, homeDTO } from "./book.model";

@Injectable({
  providedIn: 'root'
})

export class BookService {
  photoUrl = new BehaviorSubject<string>(null);
  constructor(private http: HttpClient) {

  }
  private apiURL = environment.apiURL + '/products';

  public getHomePageBooks(): Observable<homeDTO> {
    return this.http.get<homeDTO>(this.apiURL);
  }

  public getRelatedProducts(id: number): Observable<bookDTO> {
    return this.http.get<bookDTO>(`${this.apiURL}/${id}/related`);
  }

  public getById(id: number): Observable<bookDTO> {
    return this.http.get<bookDTO>(`${this.apiURL}/${id}`);
  }

  public putGet(id: number): Observable<BookPutGetDTO> {
    return this.http.get<BookPutGetDTO>(`${this.apiURL}/putget/${id}`);
  }

  public edit(id: number, bookCreationDTO: bookCreationDTO) {
    const formData = this.BuildFormData(bookCreationDTO);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public filter(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });
    return this.http.get<bookDTO[]>(`${this.apiURL}/filter`, { params, observe: 'response' });
  }

  public sort(direction: string): Observable<any> {
    return this.http.get<bookDTO[]>(`${this.apiURL}/sort/${direction}`);
  }

  public postGet(): Observable<BookPostGetDTO> {
    return this.http.get<BookPostGetDTO>(`${this.apiURL}/postget`);
  }

  public create(bookCreationDTO: bookCreationDTO): Observable<number> {
    const formData = this.BuildFormData(bookCreationDTO);
    return this.http.post<number>(this.apiURL, formData);
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  setMainPhoto(productId: number, id: number) {
    return this.http.post(`${this.apiURL}/${productId}/Photos/${id}/setMain`, {});
  }

  deletePhoto(productId: number, id: number) {
    return this.http.delete(`${this.apiURL}/${productId}/Photos/${id}`);
  }


  private BuildFormData(book: bookCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', book.name);
    formData.append('size', book.size);
    formData.append('price', String(book.price));
    formData.append('cover', book.cover);
    formData.append('pages', book.pages);
    formData.append('quantity', String(book.quantity));
    formData.append('content', book.content);
    formData.append('author', book.author);
    formData.append('translators', book.translators);
    if (book.releaseDate) {
      formData.append('releaseDate', formatDateFormData(book.releaseDate));
    }

    if (book.productImage) {
      formData.append('productImage', book.productImage);
    }
    formData.append('CategoryId', String(book.CategoryId));
    formData.append('PublisherId', String(book.PublisherId));
    formData.append('genresIds', JSON.stringify(book.genresIds));


    return formData;
  }
}