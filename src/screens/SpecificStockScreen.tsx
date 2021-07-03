import {
  Box,
  Button,
  FormControl,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
//@ts-ignore
import { CanvasJSChart } from "canvasjs-react-charts";
import {
  ChartData,
  stockPurchaseFields,
} from "../containers/SpecificStockContainer";
import { chartOptions } from "../helpers/chart";
import { translations } from "../i18n/translation";
import { useTranslation } from "react-i18next";
import { colors } from "../consts/colors";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
  chartData: ChartData[];
  stockName: string;
  currentValue: string;
  isModalVisible: boolean;
  control: Control<FieldValues>;
  setPrice: (value: string) => void;
  setAmount: (value: string) => void;
  inevertModalState: () => void;
  addToWishList: () => void;
  buyStock: () => void;
}

const SpecificStockScreen = (props: Props) => {
  const classes = useClasses();
  const { t } = useTranslation();
  const options = React.useMemo(
    () => chartOptions(props.chartData, props.stockName),
    [props.chartData, props.stockName]
  );
  return (
    <Box className={classes.container}>
      <Box className={classes.currentPriceContinaer}>
        <Typography className={classes.title} component="h1" variant="h4">
          {`${t(translations.current_price)} ${props.currentValue}$`}
        </Typography>
      </Box>
      <CanvasJSChart options={options} />
      <Box className={classes.buttonsContainer}>
        <Button
          className={classes.button}
          onClick={props.addToWishList}
          variant="outlined"
        >
          {t(translations.add_to_wish_list)}
        </Button>
        <Button
          className={classes.button}
          onClick={props.inevertModalState}
          variant="outlined"
        >
          {t(translations.buy_stock)}
        </Button>
      </Box>
      <Modal
        open={props.isModalVisible}
        onClose={props.inevertModalState}
        className={classes.modalMainContainer}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.modalBodyContainer}>
          <Typography component="h2" variant="h4">
            {t(translations.stock_purchase_title)}
          </Typography>
          <FormControl fullWidth className={classes.fieldWrapperContainer}>
            <Controller
              defaultValue=""
              control={props.control}
              name={stockPurchaseFields.amount}
              render={({ field }) => (
                <TextField
                  name={field.name}
                  className={classes.fieldContainer}
                  classes={{ root: classes.disabledArrows }}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    props.setPrice(e.target.value);
                  }}
                  type="number"
                  label={t(translations.stock_amount_label)}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth className={classes.fieldWrapperContainer}>
            <Controller
              defaultValue=""
              control={props.control}
              name={stockPurchaseFields.price}
              render={({ field }) => (
                <TextField
                  name={field.name}
                  value={field.value}
                  className={classes.fieldContainer}
                  classes={{ root: classes.disabledArrows }}
                  onChange={(e) => {
                    field.onChange(e);
                    props.setAmount(e.target.value);
                  }}
                  type="number"
                  label={t(translations.stcok_price_label)}
                />
              )}
            />
          </FormControl>

          <Button onClick={props.buyStock} variant="outlined">
            {t(translations.confirm_purchase)}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const useClasses = makeStyles({
  container: {
    height: "100vh",
    overflow: "hidden",
    backgroundColor: colors.bgColor,
    "@media (max-height: 600px)": {
      overflow: "auto",
    },
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  currentPriceContinaer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    "@media (max-width: 600px)": {
      padding: "40px",
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10%",
  },
  modalMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBodyContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.white,
    alignItems: "center",
    flexDirection: "column",
    minHeight: 300,
    minWidth: 450,
    "@media (max-width: 500px)": {
      minHeight: 300,
      minWidth: 350,
    },
    borderRadius: 8,
  },
  fieldWrapperContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fieldContainer: {
    width: "50%",
  },
  button: {
    color: colors.white,
    borderColor: colors.white,
    "@media (max-width: 600px)": {
      fontSize: "12px",
    },
  },
  disabledArrows: {
    "& ::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

export default SpecificStockScreen;
