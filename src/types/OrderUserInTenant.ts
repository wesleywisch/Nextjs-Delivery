import { Address } from "./Address";
import { CartIem } from "./CartItem";
import { OrderStatus } from "./OrderStatus";

export type OrderUserInTenant = {
  id: string;
  status: OrderStatus;
  orderDate: string;
  userId: string;
  userName?: string;
  shippingAddress: Address;
  shippingPrice: number;
  paymentType: 'card' | 'money';
  changeValue?: number;
  coupon?: string;
  couponDiscount?: number;
  products: CartIem[];
  subTotal: number;
  total: number;
}
