import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../reducers";
import { colors } from "../consts/colors";
import { hideNotification } from "../actions/notificationAction";
import CloseIcon from "../images/CloseIcon";

const Notification = () => {
  const notification = useSelector((state: State) => state.notification);
  const dispatch = useDispatch();
  const [shown, setShown] = React.useState(false);
  const [display, setDisplay] = React.useState(true);
  const classes = useStyles({
    shown,
    visible: notification.visible,
    display,
    color: notification.notification.color,
  });
  const { t } = useTranslation();

  const onCloseNotification = React.useCallback(() => {
    setShown(false);
    dispatch(hideNotification());
    setDisplay(false);
    setTimeout(() => {
      setDisplay(true);
    }, 1500);
  }, [dispatch]);

  React.useEffect(() => {
    if (notification.visible) {
      setShown(true);
      setTimeout(() => {
        setShown(false);
        setTimeout(() => {
          dispatch(hideNotification());
        }, 1500);
      }, 3500);
    }
  }, [notification.visible, dispatch]);

  return (
    <Box className={classes.wrapper}>
      <p className={classes.text}>{t(notification.notification.text)}</p>
      <CloseIcon
        color={colors.white}
        onClick={onCloseNotification}
        className={classes.closeIcon}
      />
    </Box>
  );
};

interface StyleProps {
  visible: boolean;
  shown: boolean;
  display: boolean;
  color: string;
}

const useStyles = makeStyles(() => ({
  wrapper: (p: StyleProps) => ({
    position: "fixed",
    bottom: "20px",
    left: "110px",
    right: "110px",
    padding: "10px 40px 10px 32px",
    display: p.display ? "flex" : "none",
    boxShadow: "0 4px 8px -4px rgba(26,26,26,0.2)",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: p.color,
    opacity: p.shown ? 1 : 0,
    transition: "opacity 1.5s",
    pointerEvents: p.visible ? "auto" : "none",
    zIndex: 400,
    "@media (max-width: 600px)": {
      padding: "5px 10px 5px 10px",
      maxWidth: "80%",
      minWidth: "80%",
      left: "8%",
    },
  }),
  text: {
    color: colors.white,
  },
  closeIcon: {
    cursor: "pointer",
  },
}));

export default Notification;
