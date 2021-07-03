import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../consts/colors";
import { PurchasedStock } from "../consts/interfaces";
import { translations } from "../i18n/translation";

interface Props {
  sellModalValue: { stock: PurchasedStock; currentValue: number };
  confirmSell: (uuid: string, price: number) => void;
  closeModal: () => void;
}

const SellModal = (props: Props) => {
  const { stock, currentValue } = props.sellModalValue;
  const { t } = useTranslation();
  const classes = useClasses();
  return (
    <Modal
      open={true}
      onClose={props.closeModal}
      className={classes.modalMainContainer}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.modalBodyContainer}>
        <Typography component="h2" variant="h4" className={classes.titleText}>
          {stock.name}
        </Typography>
        <Box className={classes.informationContainer}>
          <Typography component="p" className={classes.priceText}>
            {`${t(translations.invested_value)}: ${stock.price}$`}
          </Typography>
          <Typography component="p" className={classes.priceText}>
            {`${t(translations.current_value)}: ${
              (Math.round(currentValue * stock.amount) * 100) / 100
            }$`}
          </Typography>
        </Box>
        <Typography component="p" className={classes.priceText}>
          {`${t(translations.total_amount_text)}: ${stock.amount}`}
        </Typography>
        <Button
          className={classes.sellButton}
          onClick={() =>
            props.confirmSell(stock.uuid, currentValue * stock.amount)
          }
          variant="outlined"
        >
          {t(translations.confirm_sell)}
        </Button>
      </Box>
    </Modal>
  );
};

const useClasses = makeStyles({
  modalMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBodyContainer: {
    display: "flex",
    backgroundColor: colors.white,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 300,
    minWidth: 450,
    "@media (max-width: 580px)": {
      minHeight: 300,
      minWidth: 200,
    },

    borderRadius: 8,
  },
  titleText: {
    marginTop: 20,
    textAlign: "center",
  },
  informationContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media (max-width: 580px)": {
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  sellButton: {
    marginBottom: 20,
  },
  priceText: {
    fontWeight: "bold",
  },
});

export default SellModal;
