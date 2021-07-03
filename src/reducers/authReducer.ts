import { REMOVE_USER, SET_USER } from "../actions/authAction";
import { User } from "../consts/interfaces";

export type AuthState = {
  user: User | undefined;
};

export type Action = {
  type: string;
  [key: string]: any;
};

export const authInitialState: AuthState = {
  user: undefined,
};

export const authReducer = (state = authInitialState, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER: {
      return {};
    }
    default:
      return state;
  }
};
