import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { district, province, ward } from '../../provice.model';
import { ProvinceService } from '../../province.service';
import { userAddress, userAddressCreation } from '../../security.model';


@Component({
  selector: 'app-address-form-manage',
  templateUrl: './address-form-manage.component.html',
  styleUrls: ['./address-form-manage.component.css']
})
export class AddressFormManageComponent implements OnInit {


  provinces: province[];
  districts: district[];
  wards: ward[];
  addresses: userAddress;
  addressForm: FormGroup;
  temp: any[];
  @Input()
  model: userAddressCreation;
  @Output()
  onSaveChanges: EventEmitter<userAddressCreation> = new EventEmitter<userAddressCreation>();
  constructor(private provinceService: ProvinceService
    , private fb: FormBuilder) { }

  ngOnInit() {
    this.provinceService.getProvice().subscribe((province) => {
      this.provinces = province['results'];
    });
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

    if (this.model !== undefined){
      this.addressForm.patchValue(this.model);
    }
  }

  saveChanges(){
    this.onSaveChanges.emit(this.addressForm.value);
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

}
