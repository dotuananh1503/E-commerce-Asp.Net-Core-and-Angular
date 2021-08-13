import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { userCredentials, userLogin } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  form: FormGroup;
  model: userLogin;

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
    });
  }

  login(userCredentials: userLogin) {
    this.securityService
      .login(userCredentials)
      .subscribe((authenticationResponse) => {
        this.securityService.saveToken(authenticationResponse);
        Swal.fire("Success", "ĐĂNG NHẬP THÀNH CÔNG!!!", "success");
        this.router.navigate(['/categories']);
      }, () => {
        Swal.fire("Error", "ĐĂNG NHẬP THẤT BẠI", "error");
      });
  }

}
