import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../../shared/auth.service';
import { userInfo } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userSocial: SocialUser;
  loggedIn: boolean;
  user: userInfo;
  constructor(public authService: AuthService, private socialService: SocialAuthService,
    private securityService: SecurityService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initSocialForm();
    this.socialService.authState.subscribe((user) => {
      this.userSocial = user;
      this.loggedIn = (user != null);
    });
    this.testUser();
    this.securityService.getUserInfo().subscribe((response) => {
      this.user = response;
      this.initUserForm();
    })
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

  userInfoForm: FormGroup
  private initUserForm(){
    this.userInfoForm = this.fb.group({
      displayName: [null],
      email: [null],
      gender: [null]
    });

      this.userInfoForm.patchValue(this.user);
      console.log(this.userInfoForm.value);
  }



  profileSocialForm: FormGroup
  private initSocialForm() {
    this.profileSocialForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }),
      lastName: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true })
    })

    setTimeout(() => {
      if(this.userSocial)
      {
        this.profileSocialForm.patchValue({
          firstName: this.userSocial.firstName,
          lastName: this.userSocial.lastName,
          email: this.userSocial.email
        })
      }
    }, 500)
  }
}
