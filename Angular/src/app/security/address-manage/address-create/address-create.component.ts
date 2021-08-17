import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { userAddressCreation } from '../../security.model';
import { SecurityService } from '../../security.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  constructor(private securityService: SecurityService, private router: Router) { }

  ngOnInit() {
  }

  saveChanges(address: userAddressCreation) {
    this.securityService.createUserAddress(address).subscribe(() => {
      Swal.fire("Success", "Thêm thành công!", "success");
      this.router.navigate(['/user/address']);
    }, err => {
      console.log(err);
      Swal.fire("Error", "Failed", "error");
    })
  }

}
