import { useContext } from "react";
import { AppContext } from "../contexts/app";

import { Actions } from "../contexts/app/types";
import { Tenant } from "../types/Tenant";
import { Address } from "../types/Address";

export function useAppContext() {
  const { state, dispatch } = useContext(AppContext)

  return {
    ...state,
    setTenant: (tenant: Tenant) => {
      dispatch({
        type: Actions.SET_TENANT,
        payload: { tenant },
      })
    },
    setShippingAddress: (shippingAddress: Address) => {
      dispatch({
        type: Actions.SET_SHIPPING_ADDRESS,
        payload: { shippingAddress },
      })
    },
    setShippingPrice: (shippingPrice: number) => {
      dispatch({
        type: Actions.SET_SHIPPING_PRICE,
        payload: { shippingPrice },
      })
    },
  }
}
