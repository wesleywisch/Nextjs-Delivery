import { ActionType, Actions, DataType } from './types';

export function reducer(state: DataType, action: ActionType) {
  switch (action.type) {
   case Actions.SET_TENANT:
      return { ...state, tenant: action.payload.tenant }

    default: return state;
  }
}
