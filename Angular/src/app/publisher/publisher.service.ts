import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { publisherCreationDTO, publisherDTO } from "./publisher.model";

@Injectable({
    providedIn: 'root'
})
export class PublisherService{
    constructor(private http: HttpClient) {

    }

    private apiURL = environment.apiURL + '/publishers'
    create(publisher: publisherCreationDTO) {
        const formData = this.buildFormData(publisher);
        return this.http.post(this.apiURL, formData); 
    }

    get(page: number, recordsPerPage: number): Observable<any>{
        let params = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('recordsPerPage', recordsPerPage.toString());
        return this.http.get<publisherDTO[]>(this.apiURL, {observe: 'response', params});
    }

    getById(id: number): Observable<publisherDTO> {
        return this.http.get<publisherDTO>(`${this.apiURL}/${id}`);
    }

    edit(id: number, publisher: publisherCreationDTO){
        const formData = this.buildFormData(publisher);
        return this.http.put(`${this.apiURL}/${id}`, formData);
    }

    delete(id: number){
        return this.http.delete(`${this.apiURL}/${id}`);
    }

    private buildFormData(publisher: publisherCreationDTO): FormData {
        const formData = new FormData();
        formData.append('name', publisher.name);

        if(publisher.picture) {
            formData.append('picture', publisher.picture);
        }

        return formData;
    }
}