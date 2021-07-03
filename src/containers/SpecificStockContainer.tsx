import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setNotification } from "../actions/notificationAction";
import Spinner from "../components/Spinner";
import { colors } from "../consts/colors";
import { formatChart } from "../helpers/chart";
import { translations } from "../i18n/translation";
import SpecificStockScreen from "../screens/SpecificStockScreen";
import firebase from "firebase";
import { priceFormater } from "../helpers/priceFormater";
import { useForm } from "react-hook-form";
import { goBack } from "../helpers/navigation";
import { uuid } from "uuidv4";
import {
  addToFavorites,
  addToPurchased,
  fetchChartData,
  reduceAccountMoney,
} from "../helpers/specificStockAPI";
import { State } from "../reducers";

export interface ChartData {
  x: number;
  y: number;
}

interface Fields {
  amount: string;
  price: string;
}

export const stockPurchaseFields = {
  amount: "amount",
  price: "price",
};

const SpecificStockContainer = () => {
  const { symbol, name } = useParams<{ symbol: string; name: string }>();
  const walletStatus = useSelector((state: State) => state.wallet.wallet);
  const { control, handleSubmit, setValue } = useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const currentValue = React.useMemo(
    () =>
      chartData.length ? priceFormater(chartData[chartData.length - 1].y) : "0",
    [chartData]
  );

  const currentUserUid = React.useMemo(
    () => firebase.auth().currentUser?.uid,
    []
  );

  React.useEffect(() => {
    fetchChartData(symbol)
      .then((response) => {
        const timestamp = response.data.chart.result[0].timestamp;
        const marketClosedValues = formatChart(
          response.data.chart.result[0].indicators.quote[0].close,
          timestamp
        );
        if (marketClosedValues) {
          setChartData(Object.values(marketClosedValues));
        }
      })
      .catch(() => {
        dispatch(
          setNotification({
            text: translations.error_while_reading_data,
            color: colors.fireBrick,
          })
        );
      });
  }, [symbol, dispatch]);

  const addToWishList = React.useCallback(async () => {
    try {
      const stockUUID = uuid();
      await addToFavorites(
        symbol,
        name,
        stockUUID,
        currentUserUid ? currentUserUid : ""
      );
      setIsModalVisible(false);
      dispatch(
        setNotification({
          text: translations.successfully_added_to_wishlist,
          color: colors.success,
        })
      );
      goBack(history);
    } catch (error) {
      dispatch(
        setNotification({
          text: translations.something_went_wrong,
          color: colors.fireBrick,
        })
      );
    }
  }, [currentUserUid, symbol, name, history, dispatch]);

  const buyStock = React.useCallback(
    async (data: Fields) => {
      try {
        if (walletStatus >= parseFloat(data.price) && currentUserUid) {
          const stockUUID = uuid();
          const purchasedStock = {
            symbol,
            name,
            price: parseFloat(data.price),
            amount: parseFloat(data.amount),
            uuid: stockUUID,
          };
          await addToPurchased(currentUserUid, stockUUID, purchasedStock);
          const newWalletStatus = walletStatus - purchasedStock.price;
          await reduceAccountMoney(newWalletStatus, currentUserUid);
          dispatch(
            setNotification({
              text: translations.successfully_buyed_stock,
              color: colors.success,
            })
          );
          goBack(history);
        } else {
          dispatch(
            setNotification({
              text: translations.you_dont_have_enough_money,
              color: colors.fireBrick,
            })
          );
        }
      } catch (error) {
        dispatch(
          setNotification({
            text: translations.something_went_wrong,
            color: colors.fireBrick,
          })
        );
      }
    },
    [currentUserUid, name, history, symbol, walletStatus, dispatch]
  );

  const setAmount = (value: string) => {
    const currentPrice = chartData[chartData.length - 1].y;
    setValue(
      stockPurchaseFields.amount,
      Math.round((parseFloat(value) / currentPrice) * 100) / 100
    );
  };

  const setPrice = (value: string) => {
    const currentPrice = chartData[chartData.length - 1].y;
    setValue(
      stockPurchaseFields.price,
      Math.round(currentPrice * parseFloat(value) * 100) / 100
    );
  };

  return chartData.length ? (
    <SpecificStockScreen
      chartData={chartData}
      stockName={name}
      isModalVisible={isModalVisible}
      currentValue={currentValue}
      control={control}
      setPrice={setPrice}
      setAmount={setAmount}
      inevertModalState={() => setIsModalVisible((curr) => !curr)}
      addToWishList={addToWishList}
      buyStock={handleSubmit(buyStock)}
    />
  ) : (
    <Spinner />
  );
};

export default SpecificStockContainer;
