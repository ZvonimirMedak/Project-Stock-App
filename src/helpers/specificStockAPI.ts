import axios from "axios";
import firebase from "firebase";
import { firebaseCollections } from "../consts/firebaseEnv";
import { PurchasedStock } from "../consts/interfaces";

export const fetchChartData = (symbol: string) => {
  return axios.request({
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart",
    params: { interval: "5m", symbol: symbol, range: "1d", region: "US" },
    headers: {
      "x-rapidapi-key": "d61a1eb47fmsh0d8daf8b10d2ab6p183bd9jsn351c8602f81b",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  });
};

export const addToFavorites = (
  symbol: string,
  name: string,
  uuid: string,
  currentUserUid: string
) => {
  return firebase
    .firestore()
    .collection(`${firebaseCollections.FAVORITES}-${currentUserUid}`)
    .doc(uuid)
    .set({
      uuid,
      symbol,
      name,
    });
};

export const addToPurchased = (
  currentUserUid: string,
  uuid: string,
  purchasedStock: PurchasedStock
) => {
  return firebase
    .firestore()
    .collection(`${firebaseCollections.BUYED_STOCK}-${currentUserUid}`)
    .doc(uuid)
    .set(purchasedStock);
};

export const reduceAccountMoney = (amount: number, currentUserUID: string) => {
  return firebase
    .firestore()
    .collection(firebaseCollections.WALLET)
    .doc(currentUserUID)
    .update({
      wallet: amount,
    });
};
