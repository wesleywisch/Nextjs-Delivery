import { Address } from "./Address";
import { CartIem } from "./CartItem";
import { OrderStatus } from "./OrderStatus";

export type Order = {
  id: string;
  status: OrderStatus;
  orderDate: string;
  userId: string;
  shippingAddress: Address;
  shippingPrice: number;
  paymentType: 'money' | 'card';
  paymentChange?: number;
  coupon?: string;
  couponDiscount?: number;
  products: CartIem[];
  subTotal: number;
  total: number;
}
