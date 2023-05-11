import { Dispatch } from "react";

import { Tenant } from "../../types/Tenant"
import { Address } from "../../types/Address";

export type DataType = {
  tenant: Tenant | null;
  shippingAddress: Address | null;
  shippingPrice: number;
}

export type ActionType = {
  type: Actions;
  payload?: any;
}

export type ContextType = {
  state: DataType;
  dispatch: Dispatch<ActionType>;
}

export enum Actions {
  SET_TENANT,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_PRICE,
}
