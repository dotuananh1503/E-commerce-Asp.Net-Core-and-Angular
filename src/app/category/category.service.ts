import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { categoryCreationDTO, categoryDTO } from "./category.model";


@Injectable({
    providedIn: 'root'
})
export class CategoryServicce {
    private apiURL = environment.apiURL + "/categories";

    constructor(private http: HttpClient) {

    }

    getCat(): Observable<categoryDTO[]>{
        return this.http.get<categoryDTO[]>(this.apiURL);
    } 

    getById(id: number): Observable<categoryDTO>{
        return this.http.get<categoryDTO>(`${this.apiURL}/${id}`);
    }
    
    create(category: categoryCreationDTO){
        return this.http.post(this.apiURL, category);
    }
    
    edit(id: number, category: categoryCreationDTO){
        return this.http.put(`${this.apiURL}/${id}`, category);
    }
    
    delete(id: number) {
        return this.http.delete(`${this.apiURL}/${id}`);
    }
}