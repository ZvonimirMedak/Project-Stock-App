import React from "react";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import { colors } from "../consts/colors";
import Header from "../components/Header";
import { AllStocks, FavoriteStock, PurchasedStock } from "../consts/interfaces";
import CustomTable from "../components/CustomTable";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { ParamsInterface } from "../consts/headers/params";
import { PaginationStep } from "../containers/StockContainer";
import SellModal from "../components/SellModal";
import { translations } from "../i18n/translation";
import { useTranslation } from "react-i18next";

interface Props {
  stocks: AllStocks[] | PurchasedStock[] | FavoriteStock[];
  tableParams: ParamsInterface;
  title: string;
  sellModalValue?: { stock: PurchasedStock; currentValue: number };
  confirmSell: (uuid: string, price: number) => void;
  closeModal: () => void;
  openSellModal: (stock: PurchasedStock) => void;
  removeStock: (uuid: string) => void;
  loadData: (step: PaginationStep) => void;
  handleViewMorePress: (item: AllStocks) => void;
}

const StockScreen = (props: Props) => {
  const {
    stocks,
    tableParams,
    title,
    sellModalValue,
    confirmSell,
    handleViewMorePress,
    openSellModal,
    loadData,
    removeStock,
    closeModal,
  } = props;
  const classes = useClasses();
  const { t } = useTranslation();

  const MemoizedTable = React.useMemo(() => {
    if (stocks.length) {
      return (
        <CustomTable
          tableParams={tableParams}
          data={stocks}
          openSellModal={openSellModal}
          removeStock={removeStock}
          handleButtonPress={handleViewMorePress}
        />
      );
    }
    return (
      <Box className={classes.textPosition}>
        <Typography
          variant="h4"
          component="h2"
          className={classes.nothingToShowText}
        >
          {t(translations.nothing_to_show)}
        </Typography>
      </Box>
    );
  }, [
    stocks,
    tableParams,
    classes.textPosition,
    classes.nothingToShowText,
    handleViewMorePress,
    removeStock,
    t,
    openSellModal,
  ]);

  const MemoizedSellModal = React.useMemo(() => {
    if (sellModalValue) {
      return (
        <SellModal
          sellModalValue={sellModalValue}
          closeModal={closeModal}
          confirmSell={confirmSell}
        />
      );
    }
    return null;
  }, [sellModalValue, closeModal, confirmSell]);

  return (
    <Box className={classes.mainContainer}>
      <Header title={title} />
      {MemoizedTable}
      {MemoizedSellModal}
      {stocks.length > 99 ? (
        <Box className={classes.iconPosition}>
          <IconButton onClick={() => loadData(PaginationStep.NEGATIVE)}>
            <ArrowLeftIcon fontSize="large" htmlColor={colors.white} />
          </IconButton>
          <IconButton onClick={() => loadData(PaginationStep.POSITIVE)}>
            <ArrowRightIcon fontSize="large" htmlColor={colors.white} />
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
};

const useClasses = makeStyles({
  mainContainer: {
    backgroundColor: colors.bgColor,
    height: "100vh",
  },
  iconPosition: {
    display: "flex",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  textPosition: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  nothingToShowText: {
    color: colors.white,
    "@media (max-width: 700px)": {
      fontSize: "22px",
    },
  },
});

export default StockScreen;
