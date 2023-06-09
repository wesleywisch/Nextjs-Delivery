import { useContext } from "react";
import { setCookie } from "cookies-next";

import { AuthContext } from "../contexts/auth";

import { Actions } from "../contexts/auth/types";
import { User } from "../types/user";

export function useAuthContext() {
  const { state, dispatch } = useContext(AuthContext)

  return {
    ...state,
    setToken: (token: string) => {
      setCookie('@token', token);

      dispatch({
        type: Actions.SET_TOKEN,
        payload: { token },
      })
    },
    setUser: (user: User | null) => {
      dispatch({
        type: Actions.SET_USER,
        payload: { user },
      })
    },
  }
}
