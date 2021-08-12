import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { authenticationResponse, userAddress, userChangePassword, userCredentials, userInfo, userLogin } from "./security.model";

@Injectable({
    providedIn: 'root'
})

export class SecurityService {
    constructor(private http: HttpClient) { }

    private apiURL = environment.apiURL + "/account";
    private readonly tokenKey: string = 'token';
    private readonly expirationTokenKey: string = 'token-expiration'

    isAuthenticated(): boolean {
        const token = localStorage.getItem(this.tokenKey);

        if (!token) {
            return false;
        }

        const expiration = localStorage.getItem(this.expirationTokenKey);
        const expirationDate = new Date(expiration);

        if (expirationDate <= new Date()) {
            this.logout();
            return false;
        }

        return true;
    }

    getRole(): string {
        return 'admin';
    }

    getUserInfo(): Observable<userInfo> {
        return this.http.get<userInfo>(this.apiURL + "/user");
    }

    getUserAddresses(): Observable<userAddress> {
        return this.http.get<userAddress>(this.apiURL + "/user/addresses");
    }

    getFieldFromJWT(field: string): string {
        const token = localStorage.getItem(this.tokenKey);
        if (!token) { return ''; }
        const dataToken = JSON.parse(atob(token.split('.')[1]));
        return dataToken[field];
    }

    register(userCredentials: userCredentials): Observable<authenticationResponse> {
        return this.http.post<authenticationResponse>(this.apiURL + "/create", userCredentials);
    }

    changePassword(userChangePassword: userChangePassword) {
        return this.http.post(this.apiURL + "/changepassword", userChangePassword);
    }

    login(userCredentials: userLogin): Observable<authenticationResponse> {
        return this.http.post<authenticationResponse>(this.apiURL + "/login", userCredentials);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.expirationTokenKey);
    }

    saveToken(authenticationResponse: authenticationResponse) {
        localStorage.setItem(this.tokenKey, authenticationResponse.token);
        localStorage.setItem(this.expirationTokenKey, authenticationResponse.expiration.toString());
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }
}