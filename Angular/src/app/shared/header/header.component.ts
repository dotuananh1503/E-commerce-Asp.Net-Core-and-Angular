import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { ICart, ICartTotals } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { SecurityService } from 'src/app/security/security.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userSocial: SocialUser;
  loggedIn: boolean;
  cart$: Observable<ICart>;
  user;
  searchForm: FormGroup;
  isAuthorized;
  cartTotals$: Observable<ICartTotals>;
  constructor(private cartService: CartService, private socialService: SocialAuthService, 
    private router: Router,
    public securityService: SecurityService) {
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
    this.isAuthorized = this.securityService.isAuthenticated();
    this.cartTotals$ = this.cartService.cartTotal$;
    console.log(this.isAuthorized);
  }

  onSearch() {
    this.router.navigate(['/product-collector'], { queryParams: { nameSearch: this.searchForm.get('nameSeach').value } });
  }

  onClickonicon() {
    var icon = document.querySelector('.search__action__box');
    icon.classList.toggle('show__box');
  }

}
