import { Dispatch } from "react";

import { Tenant } from "../../types/Tenant"

export type DataType = {
  tenant: Tenant | null;
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
  SET_TENANT
}
