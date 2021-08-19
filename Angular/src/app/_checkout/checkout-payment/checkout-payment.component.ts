import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICart } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { IOrder } from '../checkout.model';
import { CheckoutService } from '../checkout.service';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {

  @Input() checkoutForm: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;
  cardHandler = this.onChange.bind(this);
  constructor(private cartService: CartService, 
    private checkoutService: CheckoutService,
    private router: Router, 
    private toastService: ToastrService) { }

  ngAfterViewInit() {
    this.stripe = Stripe('pk_test_51JOj1MHmdYPzfPuBEjd9cET0ENUkqCeHruySMl4bIofqKGTyOTjxSNrLCxpBCh42J1mINaoTNy7zFDXZKsMxq3ao00qRTwIFWB')
    const elements = this.stripe.elements();
    
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);

  }

  ngOnDestroy(){
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event){
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch(event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  async submitOrder() {
    this.loading = true;
    const cart = this.cartService.getCurrentCartValue();
    try {
      const createdOrder = await this.createOrder(cart);
      const paymentResult = await this.confirmPaymentWithStripe(cart);
      if(paymentResult.paymentIntent){
        this.cartService.deleteCart(cart);
        const navigationExtras: NavigationExtras = {state: createdOrder};
        this.router.navigate(['/success'], navigationExtras);
      } else {
        this.toastService.error(paymentResult.error.message);  
      }
      this.loading = false;
    } catch (error) {
        console.log(error);  
        this.loading = false;
    }
  }

  private async createOrder(cart: ICart){
    const orderToCreate = this.getOrderToCreate(cart);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }

  private async confirmPaymentWithStripe(cart){
    return this.stripe.confirmCardPayment(cart.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    });
  }

  showToastr() {
    this.toastService.success("Tạo đơn hàng thành công", "Thông báo");
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

}
