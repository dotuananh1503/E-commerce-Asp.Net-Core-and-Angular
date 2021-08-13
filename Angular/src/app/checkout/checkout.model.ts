import { userAddress } from "../security/security.model";

export interface IOrderToCreate {
    cartId: string;
    deliveryMethodId: number;
    paymentMethodId: number;
    orderNote: string;
    shipToAddress: userAddress;
}

export interface OrderItem {
    id: number;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: userAddress;
    deliveryMethod: string;
    paymentMethod: string;
    orderNote: string;
    shippingPrice: number;
    orderItems: OrderItem[];
    subtotal: number;
    total: number;
    status: string;
}

export interface IDeliveryMethod {
    shortName: string;
    deliveryTime: string;
    description: string;
    price: number;
    id: number;
}

export interface IPaymentMethod {
    description: string;
    id: number;
}