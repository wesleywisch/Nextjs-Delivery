import { Address } from "./Address";
import { CartIem } from "./CartItem";

export type Order = {
  id: string;
  status: 'preparing' | 'sent' | 'delivered';
  orderDate: string;
  userId: string;
  shippingAddress: Address;
  shippingPrice: number;
  shippingType: 'money' | 'card';
  paymentChange?: number;
  coupon?: string;
  couponDiscount?: number;
  products: CartIem[];
  subTotal: number;
  total: number;
}
