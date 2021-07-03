import { combineReducers, createStore } from "redux";
import { authReducer, AuthState } from "./authReducer";
import { notificationReducer, NotificationState } from "./notificationReducer";
import { walletReducer, WalletState } from "./walletReducer";

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  wallet: walletReducer,
});

export interface State {
  auth: AuthState;
  wallet: WalletState;
  notification: NotificationState;
}

const store = createStore(reducer);

export default store;
