import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userSocial: SocialUser;
  loggedIn: boolean;
  constructor(public authService: AuthService, private socialService: SocialAuthService) { }

  ngOnInit() {
    this.initSocialForm();
    this.socialService.authState.subscribe((user) => {
      this.userSocial = user;
      console.log(this.userSocial)
      this.loggedIn = (user != null);
    });
    this.testUser();
  }

  userFirstName: any;
  userLastName: any;
  UserEmail: any;

  testUser() {
    if (this.userSocial) {
      this.userFirstName = this.userSocial.firstName;
      this.userLastName = this.userSocial.lastName;
      this.UserEmail = this.userSocial.email;
    }
    else {
      this.userFirstName = '';
      this.userLastName = '';
      this.UserEmail = '';
    }
  }

  profileSocialForm: FormGroup
  private initSocialForm() {
    this.profileSocialForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }),
      lastName: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true })
    })

    setTimeout(() => {
      this.profileSocialForm.patchValue({
        firstName: this.userSocial.firstName,
        lastName: this.userSocial.lastName,
        email: this.userSocial.email
      })
    }, 500)
  }
}
