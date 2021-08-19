import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IDeliveryMethod, IOrderToCreate, IPaymentMethod } from "./checkout.model";

@Injectable()
export class CheckoutService {

    private apiURL = environment.apiURL + "/orders";
    constructor(private http: HttpClient) { }

    createOrder(order: IOrderToCreate) {
        return this.http.post(this.apiURL, order);
    }

    getDeliveryMethods() {
        return this.http.get(this.apiURL + '/deliveryMethods').pipe(
            map((dm: IDeliveryMethod[]) => {
                return dm.sort((a, b) => b.price - a.price);
            })
        );
    }

    getPaymentMethods(): Observable<IPaymentMethod> {
        return this.http.get<IPaymentMethod>(this.apiURL + '/paymentMethods');
    }

}
