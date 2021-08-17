import { Component, OnInit } from '@angular/core';
import { userAddress } from '../../security.model';
import { SecurityService } from '../../security.service';

@Component({
  selector: 'app-address-index',
  templateUrl: './address-index.component.html',
  styleUrls: ['./address-index.component.css']
})
export class AddressIndexComponent implements OnInit {

  addresses: userAddress;
  constructor( private securityService: SecurityService) { }

  ngOnInit() {
    this.securityService.getUserAddresses().subscribe(response => {
      this.addresses = response;
    })
  }

}
