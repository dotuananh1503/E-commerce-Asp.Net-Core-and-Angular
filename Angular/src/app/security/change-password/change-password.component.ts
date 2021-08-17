import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userChangePassword, userInfo } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  form: FormGroup;
  model: userChangePassword;
  user: userInfo;

  ngOnInit() {
    this.form = this.formBuilder.group({
      currentPassword: ['', {
        validators: [Validators.required]
      }],
      newPassword: ['', {
        validators: [Validators.required]
      }],
      confirmNewPassword: ['', {
        validators: [Validators.required]
      }],
    });
  }

  changePass(userChangePassword: userChangePassword) {
    if (this.securityService.isAuthenticated()) {
      this.securityService.changePassword(userChangePassword).subscribe(() => {
        console.log("ĐỔI MẬT KHẨU THÀNH CÔNG");
      })
    }
  }

}
