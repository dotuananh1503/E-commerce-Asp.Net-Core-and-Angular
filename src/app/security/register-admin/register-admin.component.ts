import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCredentials } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private securityService: SecurityService,
    private router: Router) { }

  form: FormGroup;
  model: userCredentials;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
      displayname: ['', {
        Validators: [Validators.required]
      }],
      gender: ['', {
        Validators: [Validators.required]
      }],
      profileImageUrl: ''
    });
  }

  register(userCredentials: userCredentials){
    this.securityService.register(userCredentials).subscribe(authenticationResponse => {
      this.securityService.saveToken(authenticationResponse);
      console.log(authenticationResponse);
      console.log('ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG!!!')
      this.router.navigate(['/admin/login']);
    });
  }

  onImageSelected(image){
    this.form.get('profileImageUrl').setValue(image);
  }


}
