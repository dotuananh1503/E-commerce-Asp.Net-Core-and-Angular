import { Product } from "../product/product.model";
import { v4 as uuidv4 } from 'uuid';


export interface ICart {
    id: string;
    items: ICartItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    paymentMethodId?: number;
    orderNote?: string;
    shippingPrice?: number;
}

export interface ICartItem {
    id: number;
    productName: string;
    price: number;
    productImage: string;
    quantity: number;
    releaseDate: Date;
    categoryName: string;
    publisherName: string;
}

export class Cart implements ICart {
    id = uuidv4();
    items: ICartItem[] = [];
}

export interface ICartTotals {
    shipping: number;
    subtotal: number;
    total: number;
}