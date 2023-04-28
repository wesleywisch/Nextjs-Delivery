import { ReactNode, createContext, useReducer } from "react";

import { reducer } from "./reducer";
import { ContextType, DataType } from "./types";

const initialState: DataType = {
  user: null,
  token: '',
}

export const AuthContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => { },
})

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
