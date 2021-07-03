import {
  Box,
  Button,
  InputAdornment,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { colors } from "../consts/colors";
import { translations } from "../i18n/translation";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { firebaseCollections } from "../consts/firebaseEnv";
import { setNotification } from "../actions/notificationAction";
interface Props {
  wallet: number;
  onClose: () => void;
}

interface UserFields {
  monetaryStatus: string;
}

const userFields: UserFields = {
  monetaryStatus: "monetaryStatus",
};

const UserModal = (props: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const classes = useClasses();
  const { t } = useTranslation();
  const updateWallet = async (data: UserFields) => {
    try {
      const currentUserUID = firebase.auth().currentUser?.uid;
      if (currentUserUID) {
        firebase
          .firestore()
          .collection(firebaseCollections.WALLET)
          .doc(currentUserUID)
          .set({
            wallet: parseFloat(data.monetaryStatus),
          });
        dispatch(
          setNotification({
            text: translations.successfully_added_to_wallet,
            color: colors.success,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={true}
      onClose={props.onClose}
      className={classes.modalMainContainer}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.modalBodyContainer}>
        <Typography component="h2" variant="h4" className={classes.title}>
          {t(translations.user_information)}
        </Typography>
        <Controller
          name={userFields.monetaryStatus}
          control={control}
          defaultValue={Math.round(props.wallet * 100) / 100}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              variant="outlined"
              classes={{ root: classes.disabledArrows }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={field.onChange}
              label={t(translations.monetary_status)}
              error={typeof errors.monetaryStatus !== "undefined"}
              type="number"
            />
          )}
        />
        <Button
          className={classes.button}
          onClick={handleSubmit(updateWallet)}
          variant="outlined"
        >
          {t(translations.update_wallet)}
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
    minWidth: 400,
    borderRadius: 8,
    "@media (max-width: 580px)": {
      minHeight: 300,
      minWidth: 200,
    },
  },
  title: {
    textAlign: "center",
  },
  disabledArrows: {
    "& ::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  button: {
    marginBottom: 20,
  },
});

export default UserModal;
