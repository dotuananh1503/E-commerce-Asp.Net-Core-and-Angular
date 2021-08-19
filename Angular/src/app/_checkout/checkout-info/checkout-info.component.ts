import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { AddressFormComponent } from 'src/app/security/address-form/address-form.component';
import { userAddress } from 'src/app/security/security.model';
import { SecurityService } from 'src/app/security/security.service';
import { AuthService } from 'src/app/shared/auth.service';
import Swal from 'sweetalert2';
import { IDeliveryMethod, IPaymentMethod } from '../checkout.model';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.css']
})
export class CheckoutInfoComponent implements OnInit {

  addresses;
  @Input() checkoutForm: FormGroup;
  @Input() appStepper: CdkStepper;
  isLinear = false;
  deliveryMethods: IDeliveryMethod[];
  paymentMethods: IPaymentMethod;
  constructor(private checkoutService: CheckoutService, private toastService: ToastrService,
    private cartService: CartService, public authService: AuthService,
    private socialService: SocialAuthService,
    public dialog: MatDialog,
    private securityService: SecurityService) {
  }

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
    this.checkoutService.getPaymentMethods().subscribe(response => {
      this.paymentMethods = response;
    });
    this.fetchAddress();
  }

  fetchAddress() {
    this.securityService.getUserAddresses().subscribe(response => {
      this.addresses = response;
    })
  }

  openDialog(address): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '600px',
      data: {
        address,
        editmode: true
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAddress();
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '600px',
      data: { editmode: false }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAddress();
    });
  }

  onSelected(event) {
    var id = event.target.value;
    console.log(id);
    this.getAddressFormValues(id);
  }

  getAddressFormValues(addressId: number) {
    var temp = this.addresses.filter(function (e: userAddress) {
      return e.id == addressId
    })
    this.checkoutForm.get('addressForm').patchValue(temp[0]);
    console.log(this.checkoutForm.get('addressForm').value)
  }


  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.cartService.setShippingPrice(deliveryMethod);
  }

  createPaymentIntent(){
    return this.cartService.createPaymentIntent().subscribe((resonse: any) => {
      this.toastService.success("Payment intent created");
      this.appStepper.next();
    }, error => {
      console.log(error);
    })
  }

  onDeleteAddress(id) {
    this.securityService.deleteAddressById(id).subscribe(() => {
      Swal.fire("Success", "Xóa thành công!", "success");
      this.fetchAddress();
    }, err => {
      console.log(err);
      Swal.fire("Error", "Failed", "error");
    })
  }

}
