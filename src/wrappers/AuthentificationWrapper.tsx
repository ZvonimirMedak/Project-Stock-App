import React from "react";
import { makeStyles } from "@material-ui/core";
import MainRouter from "../router/MainRouter";
import firebase from "firebase";

import { firebaseConfig } from "../consts/firebaseEnv";

const AuthentificationWrapper = () => {
  const classes = useClasses();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const firebaseCheck = React.useCallback((): Promise<firebase.User | null> => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
      });
    });
  }, []);

  const checkIfAllreadLogin = React.useCallback(async () => {
    try {
      const response = await firebaseCheck();
      if (response && response.email && response.uid) {
        /* something like this
        dispatch(
          setUser({ email: response.email, uid: response.uid, password: "" })
        );
        */
      }
      setIsMounted(true);
    } catch (error) {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: firebaseConfig.API_KEY,
        authDomain: firebaseConfig.AUTH_DOMAIN,
        projectId: firebaseConfig.PROJECT_ID,
        messagingSenderId: firebaseConfig.MESSAGING_SENDER_ID,
        storageBucket: firebaseConfig.STORAGE_BUCKET,
        appId: firebaseConfig.APP_ID,
      });
    }
    checkIfAllreadLogin();
  }, [checkIfAllreadLogin]);

  if (isMounted) {
    return (
      <>
        <main className={classes.main}>
          <MainRouter authentificationToken={""} />
        </main>
      </>
    );
  }
  return null;
};

const useClasses = makeStyles({
  main: {
    boxSizing: "border-box",
    width: "100%",
    marginLeft: "auto",
    marginRight: 0,
  },
});

export default AuthentificationWrapper;
