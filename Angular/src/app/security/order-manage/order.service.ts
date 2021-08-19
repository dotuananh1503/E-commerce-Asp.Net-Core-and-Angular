import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IOrder } from "src/app/_checkout/checkout.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService{

    private apiURL = environment.apiURL + "/orders"
    constructor(private http: HttpClient){}

    getOrderForUser(): Observable<IOrder>{
        return this.http.get<IOrder>(this.apiURL);
    }

    getOrderByIdForUser(id: number): Observable<IOrder>{
        return this.http.get<IOrder>(`${this.apiURL}/${id}`);
    }
}