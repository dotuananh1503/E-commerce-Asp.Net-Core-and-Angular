import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userAddress, userAddressCreation } from '../../security.model';
import { SecurityService } from '../../security.service';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {

  model:userAddress;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.securityService.getAddressByid(params.id).subscribe(response => {
        this.model = response;
      })
    })
  }

  saveChanges(address: userAddressCreation){
    this.securityService.updateUserAddress(this.model.id, address).subscribe(() => {
      this.router.navigate(['/user/address/']);
    });
  }

}
