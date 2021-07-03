import { combineReducers, createStore } from "redux";
import { authReducer, AuthState } from "./authReducer";
import { walletReducer, WalletState } from "./walletReducer";

const reducer = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
});

export interface State {
  auth: AuthState;
  wallet: WalletState;
}

const store = createStore(reducer);

export default store;
