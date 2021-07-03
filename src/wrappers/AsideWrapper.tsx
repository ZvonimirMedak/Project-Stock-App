import React from "react";
import { Box, IconButton, makeStyles } from "@material-ui/core";
import { OneRoute, routesNames } from "../consts/routeNames";
import { useLocation } from "react-router";
import { getActiveIndex } from "../helpers/routing";
import Route from "../components/Route";
import { dimensions } from "../consts/dimensions";
import SettingsIcon from "@material-ui/icons/Settings";
import { colors } from "../consts/colors";
import UserModal from "../components/UserModal";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../actions/walletAction";
import { firebaseCollections } from "../consts/firebaseEnv";
import { setUser } from "../actions/authAction";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { State } from "../reducers";
interface Props {
  authentificationToken: string;
}

const AsideWrapper = (props: Props) => {
  const classes = useClasses();
  const [isUserModalVisible, setIsUserModalVisible] =
    React.useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(true);
  const [activeRoute, setActiveRoute] = React.useState<number>(0);
  const location = useLocation();
  const state = useSelector((state: State) => ({
    wallet: state.wallet.wallet,
    user: state.auth.user,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsDrawerOpen(true);
    setActiveRoute(getActiveIndex(location));
  }, [location]);

  React.useEffect(() => {
    const currentUserUID = firebase.auth().currentUser?.uid;
    let subscribe: any;
    if (currentUserUID) {
      subscribe = firebase
        .firestore()
        .collection(firebaseCollections.WALLET)
        .doc(currentUserUID)
        .onSnapshot((doc) => {
          const wallet = doc.data();
          if (wallet) {
            dispatch(setWallet(wallet.wallet));
          } else {
            dispatch(setWallet(0));
          }
        });
    }
    if (!state.user?.email) {
      return () => subscribe;
    }
  }, [dispatch, state.user]);

  const Routes = React.useMemo(
    () =>
      Object.values(routesNames).map((el: OneRoute, index: number) => (
        <Route
          route={el}
          index={index}
          key={`${el.path}-route-${index}`}
          activeRoute={activeRoute}
          isActive={activeRoute === index}
        />
      )),
    [activeRoute]
  );

  const logout = React.useCallback(() => {
    firebase.auth().signOut();
    dispatch(setUser({ email: "", password: "", uid: "" }));
  }, [dispatch]);

  const MemoizedUserModal = React.useMemo(() => {
    if (isUserModalVisible) {
      return (
        <UserModal
          onClose={() => setIsUserModalVisible(false)}
          wallet={state.wallet}
        />
      );
    }
    return null;
  }, [isUserModalVisible, state.wallet]);

  if (props.authentificationToken) {
    return (
      <>
        {MemoizedUserModal}
        <div
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className={classes.iconButton}
        >
          <div
            className={classes.hamburger}
            style={{
              transform: !isDrawerOpen ? "rotate(30deg)" : "rotate(0deg)",
            }}
          />
          <div
            className={classes.hamburger}
            style={{ opacity: !isDrawerOpen ? 0 : 1 }}
          />
          <div
            className={classes.hamburger}
            style={{
              transform: !isDrawerOpen ? "rotate(-30deg)" : "rotate(0deg)",
            }}
          />
        </div>
        <aside
          className={classes.aside}
          style={{
            transform: !isDrawerOpen
              ? "translateX(0px)"
              : `translateX(-${dimensions.asideWidth})`,
            opacity: !isDrawerOpen ? 1 : 0,
          }}
        >
          <Box className={classes.asideItemsPosition}>
            <Box className={classes.routesPosition}>{Routes}</Box>
            <Box>
              <IconButton
                classes={{ root: classes.settingsIconButton }}
                onClick={logout}
              >
                <ExitToApp fontSize="large" className={classes.icon} />
              </IconButton>
              <IconButton
                classes={{ root: classes.settingsIconButton }}
                onClick={() => setIsUserModalVisible(true)}
              >
                <SettingsIcon fontSize="large" className={classes.icon} />
              </IconButton>
            </Box>
          </Box>
        </aside>
      </>
    );
  }
  return null;
};

const useClasses = makeStyles({
  aside: {
    width: dimensions.asideWidth,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    borderRight: `1px inset ${colors.white}`,
    overflowY: "auto",
    transition: "all 0.7s",
    backgroundColor: colors.bgColor,
  },
  asideItemsPosition: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  routesPosition: {
    marginTop: 80,
  },
  icon: {
    cursor: "pointer",
    marginBottom: 40,
    color: colors.white,
  },
  iconButton: {
    position: "absolute",
    left: `calc((${dimensions.asideWidth}/2) - 16px)`,
    zIndex: 101,
    top: 10,
    cursor: "pointer",
    "@media (max-width: 550px)": {
      left: "55px",
    },
    "@media (max-width: 350px)": {
      left: "20px",
    },
  },
  hamburger: {
    border: `2px solid ${colors.white}`,
    width: "32px",
    margin: 5,
    transition: "all 0.7s",
    transformOrigin: "left",
  },
  settingsIconButton: {
    backgroundColor: colors.transparent,
    "&:hover": {
      backgroundColor: colors.transparent,
    },
  },
});

export default AsideWrapper;
