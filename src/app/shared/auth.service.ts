import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user.interface";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, config } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from "angularx-social-login";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, 
              private http: HttpClient, private authSocial: SocialAuthService) {        
  }

  signInWithFB(): void {
    this.authSocial.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigate(['/'])
    },
    (err) => {
      console.log(err);
    });
  }

  signInWithGoogle(): void {
    this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigate(['/'])
    },
    (err) => {
      console.log(err);
    });;
  }

  signOut(): void {
    this.authSocial.signOut().then(() => {
        this.router.navigate(['login'])
    },
    (err) => {
      console.log(err)
    });
  }  
}