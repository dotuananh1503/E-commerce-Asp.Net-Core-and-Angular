import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ratingValuePercentage } from './rating.model';

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    constructor(private http: HttpClient) { }

    private apiURL = environment.apiURL + "/ratings";

    public rate(productId: number, rating: number, comment: string) {
        return this.http.post(this.apiURL, { productId, rating, comment });
    }

    public getRateValue(id: number): Observable<ratingValuePercentage> {
        return this.http.get<ratingValuePercentage>(`${this.apiURL}/product/${id}`);
    }
}