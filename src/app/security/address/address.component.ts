import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { district, province, ward } from '../provice.model';
import { ProvinceService } from '../province.service';
import { userAddress } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  provinces: province[];
  districts: district[];
  wards: ward[];
  addresses: userAddress;
  addressForm: FormGroup;
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  temp: any[];
  constructor(private provinceService: ProvinceService, private securityService: SecurityService
    , private fb: FormBuilder) { }

  ngOnInit() {
    this.provinceService.getProvice().subscribe((province) => {
      this.provinces = province['results'];
    });
    this.securityService.getUserAddresses().subscribe(response => {
      this.addresses = response;
    })
    this.createCheckoutForm();
  }

  createCheckoutForm() {
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
  }

  getAddressFormValues(id: number) {
    this.addressForm.patchValue(this.addresses[id]);
    console.log(this.addressForm.value);
  }

  onSelectProvince(event) {
    var name = event.target.value;
    console.log(name);
    this.temp = this.provinces.filter(x => x.province_name == name);
    this.provinceService.getDistrictById(this.temp[0].province_id).subscribe(response => {
      this.districts = response['results'];
    })
  }

  onSelectDistrict(event) {
    var name = event.target.value;
    console.log(name);
    this.temp = this.districts.filter(x => x.district_name == name);
    this.provinceService.getWardById(this.temp[0].district_id).subscribe(response => {
      this.wards = response['results'];
    })
  }

  onSelected(event) {
    var id = event.target.value;
    console.log(id);
    this.getAddressFormValues(id - 1);
  }

}
