export const SET_WALLET = "SET_WALLET";

type SetWallet = {
  readonly type: typeof SET_WALLET;
  readonly wallet: number;
};

export const setWallet = (wallet: number): SetWallet => ({
  type: SET_WALLET,
  wallet,
});

export type WalletAction = SetWallet;
