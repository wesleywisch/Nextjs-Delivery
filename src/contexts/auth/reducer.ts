import { ActionType, Actions, DataType } from './types';

export function reducer(state: DataType, action: ActionType) {
  switch (action.type) {
   case Actions.SET_TOKEN:
      if (!action.payload.token)  {
        return { ...state, token: '', user: null, }
      }
      return { ...state, token: action.payload.token };

   case Actions.SET_USER:
      if (!action.payload.user)  {
        return { ...state, user: null, token: '', }
      }
      return { ...state, user: action.payload.user };

    default: return state;
  }
}
