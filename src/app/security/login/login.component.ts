import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userSocial: SocialUser;
  loggedIn: boolean;
  loginForm: FormGroup;
  email = ""
  password = ""
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle
  constructor(private authService: AuthService, private router: Router,
    private socialService: SocialAuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    })
    this.socialService.authState.subscribe((user) => {
      this.userSocial = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  signInWithFB() {
    this.authService.signInWithFB();
  }

  signOut() {
    this.authService.signOut();
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  onLogin() {
    this.clearErrorMessage();
  }

  validateForm(email, password) {
    /*     if(email.lenght === 0)
        {
          this.errorMessage = "please enter email id";
          return false;
        } */

    if (password.lenght === 0) {
      this.errorMessage = "please enter password";
      return false;
    }

    if (password.lenght < 6) {
      this.errorMessage = "password should be at least 6 char";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
