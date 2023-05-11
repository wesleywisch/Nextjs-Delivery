import { ReactNode, createContext, useReducer } from "react";

import { reducer } from "./reducer";
import { ContextType, DataType } from "./types";

const initialState: DataType = {
  tenant: null,
  shippingAddress: null,
  shippingPrice: 0,
}

export const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => { },
})

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
