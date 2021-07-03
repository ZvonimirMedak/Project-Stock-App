import { SET_WALLET, WalletAction } from "../actions/walletAction";

export type WalletState = {
  wallet: number;
};

export const walletInitialState: WalletState = {
  wallet: 0,
};

export const walletReducer = (
  state = walletInitialState,
  action: WalletAction
) => {
  switch (action.type) {
    case SET_WALLET:
      return { ...state, wallet: action.wallet };
    default:
      return state;
  }
};
