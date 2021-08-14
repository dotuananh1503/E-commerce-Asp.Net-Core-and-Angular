import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICart, ICartTotals } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
import { AddressFormComponent } from '../security/address-form/address-form.component';
import { userAddress, userAddressCreation } from '../security/security.model';
import { SecurityService } from '../security/security.service';
import { AuthService } from '../shared/auth.service';
import { IDeliveryMethod, IOrder, IPaymentMethod } from './checkout.model';
import { CheckoutService } from './checkout.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  addresses;
  deliveryMethods: IDeliveryMethod[];
  paymentMethods: IPaymentMethod;
  cartTotals$: Observable<ICartTotals>;
  constructor(private checkoutService: CheckoutService, private toastService: ToastrService,
    private cartService: CartService, public authService: AuthService,
    private socialService: SocialAuthService,
    public dialog: MatDialog,
    private securityService: SecurityService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createCheckoutForm();
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
    this.checkoutService.getPaymentMethods().subscribe(response => {
      this.paymentMethods = response;
    });
    this.fetchAddress();
    this.cartTotals$ = this.cartService.cartTotal$;
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        phone: [null, Validators.required],
        ward: [null, Validators.required],
        district: [null, Validators.required],
        country: [null, Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentMethodForm: this.fb.group({
        paymentMethod: [null, Validators.required]
      }),
      noteForm: this.fb.group({
        orderNote: [null]
      })
    });
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



  showToastr() {
    this.toastService.success("Tạo đơn hàng thành công", "Thông báo");
  }

  submitOrder() {
    const cart = this.cartService.getCurrentCartValue();
    const orderToCreate = this.getOrderToCreate(cart);
    console.log(orderToCreate);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.showToastr();
      this.cartService.deleteLocalCart(cart.id);
      console.log(order);
    });
  }

  private getOrderToCreate(cart: ICart) {
    return {
      cartId: cart.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      paymentMethodId: +this.checkoutForm.get('paymentMethodForm').get('paymentMethod').value,
      orderNote: this.checkoutForm.get('noteForm').get('orderNote').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    };
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
