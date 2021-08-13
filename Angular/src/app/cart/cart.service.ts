import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Cart, ICart, ICartItem, ICartTotals } from "./cart.model";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { bookDTO } from "../book/book.model";
import { IDeliveryMethod, IPaymentMethod } from "../checkout/checkout.model";


@Injectable()
export class CartService {
  private apiURL = environment.apiURL;
  private cartSource = new BehaviorSubject<ICart>(null);
  private cartTotalSource = new BehaviorSubject<ICartTotals>(null);
  cart$ = this.cartSource.asObservable();
  cartTotal$ = this.cartTotalSource.asObservable();
  releaseDate: Date;
  shipping = 0;
  constructor(private http: HttpClient) { }

  getCart(id: string) {
    return this.http.get(this.apiURL + '/carts?id=' + id)
      .pipe(
        map((cart: ICart) => {
          this.cartSource.next(cart);
          this.calculateTotals();
        })
      );
  }

  setCart(cart: ICart) {
    return this.http.post(this.apiURL + '/carts', cart).subscribe((response: ICart) => {
      this.cartSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    })
  }

  getCurrentCartValue() {
    return this.cartSource.value;
  }

  addItemToCart(item: bookDTO, quantity = 1) {
    const itemtoAdd: ICartItem = this.mapProductItemToCartItem(item, quantity);
    const cart = this.getCurrentCartValue() ?? this.createCart();
    cart.items = this.AddOrUpdateItem(cart.items, itemtoAdd, quantity);
    this.setCart(cart);
  }

  private calculateTotals() {
    const cart = this.getCurrentCartValue();
    const shipping = this.shipping;
    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.cartTotalSource.next({ shipping, total, subtotal });
  }

  incrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    const foundIndexItem = cart.items.findIndex(x => x.id === item.id);
    cart.items[foundIndexItem].quantity++;
    this.setCart(cart);
  }

  decrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    const foundIndexItem = cart.items.findIndex(x => x.id === item.id);
    if (cart.items[foundIndexItem].quantity > 1) {
      cart.items[foundIndexItem].quantity--;
      this.setCart(cart);
    } else {
      this.removeItemFromCart(item);
    }
  }

  removeItemFromCart(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    if (cart.items.some(x => x.id === item.id)) {
      cart.items = cart.items.filter(i => i.id !== item.id);
      if (cart.items.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }
  }

  deleteLocalCart(id: string) {
    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('cart_id');
  }

  deleteCart(cart: ICart) {
    return this.http.delete(this.apiURL + '/carts?id=' + cart.id).subscribe(() => {
      this.cartSource.next(null);
      this.cartTotalSource.next(null);
      localStorage.removeItem('cart_id');
    }, error => {
      console.log(error);
    });
  }

  private AddOrUpdateItem(items: ICartItem[], itemToAdd: ICartItem, quantity: number): ICartItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createCart(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  private mapProductItemToCartItem(item: bookDTO, quantity: number): ICartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      productImage: item.productImage,
      quantity: quantity,
      releaseDate: item.releaseDate,
      categoryName: item.categoryName,
      publisherName: item.publisherName
    }
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    const cart = this.getCurrentCartValue();
    cart.deliveryMethodId = deliveryMethod.id;
    cart.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setCart(cart);
  }





}