import axios from "axios";
import React from "react";
import firebase from "firebase";
import { AllStocks, FavoriteStock, PurchasedStock } from "../consts/interfaces";
import { Dispatch } from "redux";
import { setNotification } from "../actions/notificationAction";
import { translations } from "../i18n/translation";
import { colors } from "../consts/colors";
import { firebaseCollections } from "../consts/firebaseEnv";

export const fetchMostTraded = async (
  allStocksRef: React.MutableRefObject<
    AllStocks[] | PurchasedStock[] | FavoriteStock[]
  >,
  setStocks: React.Dispatch<
    React.SetStateAction<AllStocks[] | PurchasedStock[] | FavoriteStock[]>
  >
) => {
  try {
    const response = await axios.get(
      "https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json",
      {
        headers: {
          "x-rapidapi-key":
            "d61a1eb47fmsh0d8daf8b10d2ab6p183bd9jsn351c8602f81b",
          "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
        },
      }
    );
    allStocksRef.current = response.data.data;
    setStocks(response.data.data.slice(0, 100));
  } catch (error) {
    throw error;
  }
};

export const fetchFavorites = async (
  stocksRef: React.MutableRefObject<
    AllStocks[] | PurchasedStock[] | FavoriteStock[]
  >,
  setStocks: React.Dispatch<
    React.SetStateAction<AllStocks[] | PurchasedStock[] | FavoriteStock[]>
  >
) => {
  try {
    firebase
      .firestore()
      .collection(
        `${firebaseCollections.FAVORITES}-${firebase.auth().currentUser?.uid}`
      )
      .get()
      .then((doc) => {
        const favorites = doc.docs.map((el) => el.data());
        //@ts-ignore
        stocksRef.current = favorites;
        //@ts-ignore
        setStocks(favorites.slice(0, 100));
      });
  } catch (error) {
    throw error;
  }
};

export const fetchPurchased = async (
  stocksRef: React.MutableRefObject<
    AllStocks[] | PurchasedStock[] | FavoriteStock[]
  >,
  setStocks: React.Dispatch<
    React.SetStateAction<AllStocks[] | PurchasedStock[] | FavoriteStock[]>
  >
) => {
  try {
    firebase
      .firestore()
      .collection(
        `${firebaseCollections.BUYED_STOCK}-${firebase.auth().currentUser?.uid}`
      )
      .get()
      .then((doc) => {
        const purchased = doc.docs.map((el) => el.data());
        //@ts-ignore
        stocksRef.current = purchased;
        //@ts-ignore
        setStocks(purchased.slice(0, 100));
      });
  } catch (error) {
    throw error;
  }
};

export const removeFavoriteStock = async (
  uuid: string,
  dispatch: Dispatch<any>
) => {
  firebase
    .firestore()
    .collection(
      `${firebaseCollections.FAVORITES}-${firebase.auth().currentUser?.uid}`
    )
    .doc(uuid)
    .delete()
    .then(() => {
      dispatch(
        setNotification({
          text: translations.successfully_removed_from_wishlist,
          color: colors.success,
        })
      );
    })
    .catch(() => {
      dispatch(
        setNotification({
          text: translations.something_went_wrong,
          color: colors.fireBrick,
        })
      );
    });
};

export const fetchCurrentValue = async (symbol: string) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://twelve-data1.p.rapidapi.com/price",
      params: { symbol: symbol, format: "json", outputsize: "30" },
      headers: {
        "x-rapidapi-key": "d61a1eb47fmsh0d8daf8b10d2ab6p183bd9jsn351c8602f81b",
        "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
      },
    });
    return response.data.price;
  } catch (error) {
    throw error;
  }
};

export const sellStock = async (
  amount: number,
  stockValue: number,
  currentUUID: string
) => {
  await firebase
    .firestore()
    .collection(firebaseCollections.WALLET)
    .doc(currentUUID)
    .update({
      wallet: amount + stockValue,
    });
};

export const removePurchasedStock = async (
  uuid: string,
  currentUserUUID: string
) => {
  await firebase
    .firestore()
    .collection(`${firebaseCollections.BUYED_STOCK}-${currentUserUUID}`)
    .doc(uuid)
    .delete();
};
