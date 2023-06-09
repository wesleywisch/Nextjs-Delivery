import { Dispatch } from "react";

import { User } from "../../types/user";

export type DataType = {
  token: string;
  user: User | null;
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
  SET_TOKEN,
  SET_USER,
}
