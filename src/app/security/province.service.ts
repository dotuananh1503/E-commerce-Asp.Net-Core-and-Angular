import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { district, province, ward } from "./provice.model";

@Injectable({
    providedIn: 'root'
})

export class ProvinceService {
    private apiProviceURL = "https://vapi.vnappmob.com/api";

    constructor(private http: HttpClient) { }

    getProvice() {
        return this.http.get(this.apiProviceURL + "/province");
    };

    getDistrictById(id: string) {
        return this.http.get(this.apiProviceURL + "/province/district/" + id)
    }

    getWardById(id: string) {
        return this.http.get(this.apiProviceURL + "/province/ward/" + id)
    }
}
