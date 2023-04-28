import { useContext } from "react";
import { AppContext } from "../contexts/app";

import { Actions } from "../contexts/app/types";
import { Tenant } from "../types/Tenant";

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

  }
}
