import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setNotification } from "../actions/notificationAction";
import Spinner from "../components/Spinner";
import { colors } from "../consts/colors";
import { favoritesParams } from "../consts/headers/favorites";
import { mostTradedParams } from "../consts/headers/mostTraded";
import { purchasedParams } from "../consts/headers/purchasedParams";
import { AllStocks, FavoriteStock, PurchasedStock } from "../consts/interfaces";
import {
  fetchCurrentValue,
  fetchFavorites,
  fetchMostTraded,
  fetchPurchased,
  removeFavoriteStock,
  removePurchasedStock,
  sellStock,
} from "../helpers/stockAPI";
import { goToSpecificStock } from "../helpers/navigation";
import { translations } from "../i18n/translation";
import StockScreen from "../screens/StockScreen";
import { State } from "../reducers";
import firebase from "firebase";

export enum PaginationStep {
  POSITIVE = 1,
  NEGATIVE = -1,
}

export enum ScreenType {
  MOST_TRADED = "MOST_TRADED",
  FAVORITES = "FAVORITES",
  PURCHASED = "PURCHASED",
}

interface Props {
  screenType: ScreenType;
}

const StockContainer = (props: Props) => {
  const [stocks, setStocks] = React.useState<
    AllStocks[] | PurchasedStock[] | FavoriteStock[]
  >([]);
  const [spinner, setSpinner] = React.useState<boolean>(true);
  const [sellModalValue, setSellModalValue] =
    React.useState<
      { stock: PurchasedStock; currentValue: number } | undefined
    >();
  const stocksRef = React.useRef<
    AllStocks[] | PurchasedStock[] | FavoriteStock[]
  >([]);
  const dispatch = useDispatch();
  const walletStatus = useSelector((state: State) => state.wallet.wallet);
  const { t } = useTranslation();
  const page = React.useRef<number>(1);
  const history = useHistory();

  const fetchData = React.useCallback(async () => {
    try {
      if (props.screenType === ScreenType.MOST_TRADED) {
        await fetchMostTraded(stocksRef, setStocks);
      } else if (props.screenType === ScreenType.FAVORITES) {
        await fetchFavorites(stocksRef, setStocks);
      } else {
        await fetchPurchased(stocksRef, setStocks);
      }
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      dispatch(
        setNotification({
          text: translations.something_went_wrong,
          color: colors.fireBrick,
        })
      );
    }
  }, [props.screenType, dispatch]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewMorePress = React.useCallback(
    (item: AllStocks) => {
      goToSpecificStock(history, item.symbol, item.name);
    },
    [history]
  );

  const loadData = React.useCallback((step: PaginationStep) => {
    const nextStep = page.current + step;
    if (nextStep >= 1 && stocksRef.current.length > 100 * nextStep) {
      const start = nextStep * 100;
      const end = (nextStep + 1) * 100;
      const stockPreview = stocksRef.current.slice(start, end);
      page.current = page.current + step;
      setStocks(stockPreview);
    }
  }, []);

  const tableParams = React.useMemo(() => {
    if (props.screenType === ScreenType.FAVORITES) {
      return favoritesParams;
    } else if (props.screenType === ScreenType.MOST_TRADED) {
      return mostTradedParams;
    }
    return purchasedParams;
  }, [props.screenType]);

  const screenTitle = React.useMemo(() => {
    if (props.screenType === ScreenType.FAVORITES) {
      return t(translations.favorites);
    } else if (props.screenType === ScreenType.MOST_TRADED) {
      return t(translations.most_traded);
    }
    return t(translations.user_stocks);
  }, [props.screenType, t]);

  const removeStock = React.useCallback(
    (uuid: string) => {
      removeFavoriteStock(uuid, dispatch);
      //@ts-ignore
      setStocks((curr) => curr.filter((el) => el.uuid !== uuid));
    },
    [dispatch]
  );

  const confirmSell = React.useCallback(
    async (uuid: string, price: number) => {
      try {
        const currentUUID = firebase.auth().currentUser?.uid;
        if (currentUUID) {
          await sellStock(walletStatus, price, currentUUID);
          await removePurchasedStock(uuid, currentUUID);

          //@ts-ignore
          setStocks((curr) => curr.filter((el) => el.uuid !== uuid));
          setSellModalValue(undefined);
          dispatch(
            setNotification({
              text: translations.successfully_sold_stock,
              color: colors.success,
            })
          );
        }
      } catch (error) {}
    },
    [walletStatus, dispatch]
  );

  const openSellModal = React.useCallback(async (stock: PurchasedStock) => {
    const currentValue = await fetchCurrentValue(stock.symbol);
    setSellModalValue({ stock, currentValue });
  }, []);

  const closeModal = React.useCallback(() => {
    setSellModalValue(undefined);
  }, []);

  return !spinner ? (
    <StockScreen
      stocks={stocks}
      tableParams={tableParams}
      title={screenTitle}
      sellModalValue={sellModalValue}
      confirmSell={confirmSell}
      closeModal={closeModal}
      openSellModal={openSellModal}
      removeStock={removeStock}
      loadData={loadData}
      handleViewMorePress={handleViewMorePress}
    />
  ) : (
    <Spinner />
  );
};

export default StockContainer;
