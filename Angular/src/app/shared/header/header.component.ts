import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { ICart } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userSocial: SocialUser;
  loggedIn: boolean;
  countTotal = 0;
  cart$: Observable<ICart>;
  loadedCartItem = [];
  user;
  searchForm: FormGroup;
  constructor(private cartService: CartService, private socialService: SocialAuthService, private router: Router) {
    this.socialService.authState.subscribe((user) => {
      this.userSocial = user;
      this.loggedIn = (user != null);
    });
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'nameSearch': new FormControl(null, Validators.required)
    })
    this.cart$ = this.cartService.cart$;
    console.log(this.cart$);
  }

  onSearch() {
    this.router.navigate(['/product-collector'], { queryParams: { nameSearch: this.searchForm.get('nameSeach').value } });
  }

  countItem() {
    this.loadedCartItem.forEach(() => {
      this.countTotal += 1
    })
    console.log(this.countTotal);
  }

  cartItem: number = 0;
  cartItemFunc() {
    if (localStorage.getItem('localStore') != null) {
      var cartCount = JSON.parse(localStorage.getItem('localStore'));
      this.cartItem = cartCount.length;
    }
  }

  loadItemFromCart() {
    /*     this.cartService.fetchProducts().subscribe(productData => {
          this.loadedCartItem = productData;
          this.countItem();
        }); */
  }

  onClickonicon() {
    var icon = document.querySelector('.search__action__box');
    icon.classList.toggle('show__box');
  }

}
