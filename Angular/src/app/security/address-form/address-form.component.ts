import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckoutComponent } from 'src/app/_checkout/checkout/checkout.component';
import Swal from 'sweetalert2';
import { userAddress, userAddressCreation } from '../security.model';
import { SecurityService } from '../security.service';


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  addressForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private securityService: SecurityService) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      street: [null, Validators.required],
      city: [null, Validators.required],
      phone: [null, Validators.required],
      ward: [null, Validators.required],
      district: [null, Validators.required],
      country: [null, Validators.required]
    });
    this.generateAddressFormValue();
  }

  generateAddressFormValue() {
    if (this.data.address != null) {
      this.addressForm.patchValue(this.data.address);
    }
  }

  onSubmitAddress(address: userAddressCreation) {
    if (!this.data.editmode) {
      this.createAddress(address);
    }
    else {
      var id = this.data.address.id;
      this.updateAddress(id, address);
    }
  }

  updateAddress(id: number, address: userAddressCreation) {
    this.securityService.updateUserAddress(id, address).subscribe(response => {
      console.log(response);
      Swal.fire("Success", "Đổi địa chỉ thành công!", "success");
    }, err => {
      console.log(err);
      Swal.fire("Error", "Failed", "error");
    })
  }

  createAddress(address: userAddressCreation) {
    this.securityService.createUserAddress(address).subscribe(response => {
      console.log(response);
      Swal.fire("Success", "Thêm thành công!", "success");
    }, err => {
      console.log(err);
      Swal.fire("Error", "Failed", "error");
    })
  }
}
