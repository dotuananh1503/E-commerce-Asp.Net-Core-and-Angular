import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICart, ICartTotals } from '../../cart/cart.model';
import { CartService } from '../../cart/cart.service';
import { AddressFormComponent } from '../../security/address-form/address-form.component';
import { userAddress, userAddressCreation } from '../../security/security.model';
import { SecurityService } from '../../security/security.service';
import { AuthService } from '../../shared/auth.service';
import { IDeliveryMethod, IOrder, IPaymentMethod } from '../checkout.model';
import { CheckoutService } from '../checkout.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  isLinear = false;
  cartTotals$: Observable<ICartTotals>;
  cart$: Observable<ICart>;
  constructor(private checkoutService: CheckoutService, private toastService: ToastrService,
    private cartService: CartService, public authService: AuthService,
    private socialService: SocialAuthService, private router: Router,
    public dialog: MatDialog,
    private securityService: SecurityService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createCheckoutForm();
    this.getDeliveryMethodValue();
    this.cart$ = this.cartService.cart$;
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
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null]
      })
    });
  }

  getDeliveryMethodValue() {
    const cart = this.cartService.getCurrentCartValue();
    if(cart.deliveryMethodId != null){
      this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue(cart.deliveryMethodId.toString())
    }
  }

}
