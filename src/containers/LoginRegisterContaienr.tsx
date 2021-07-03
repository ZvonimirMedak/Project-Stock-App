import React from "react";
import firebase from "firebase";
import { useForm } from "react-hook-form";
import { LoginInterface } from "../consts/interfaces";
import LoginRegisterScreen from "../screens/LoginRegisterScreen";
import { useHistory } from "react-router";
import { replaceLoginScreen } from "../helpers/navigation";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../reducers";
import { setUser } from "../actions/authAction";
import { setNotification } from "../actions/notificationAction";
import { colors } from "../consts/colors";
import { translations } from "../i18n/translation";

export const loginFields = {
  email: "email",
  password: "password",
  repeatPassword: "repeatPassword",
};

export enum Steps {
  LOGIN,
  REGISTER,
}

const LoginRegisterContaienr = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
  } = useForm();
  const [step, setStep] = React.useState(Steps.LOGIN);
  const passwordRef = React.useRef({});
  const history = useHistory();
  const user = useSelector((state: State) => state.auth.user);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  passwordRef.current = watch(loginFields.password, "");

  React.useEffect(() => {
    if (user?.uid) {
      replaceLoginScreen(history);
    } else {
      setIsMounted(true);
    }
  }, [user, history]);

  const login = React.useCallback(
    async (data: LoginInterface) => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            dispatch(
              setUser({
                email: data.email,
                uid: res.user ? res.user.uid : "randomUID",
                password: "",
              })
            );
            replaceLoginScreen(history);
          });
      } catch (error) {
        dispatch(
          setNotification({
            text: translations.login_error_message,
            color: colors.fireBrick,
          })
        );
      }
    },
    [history, dispatch]
  );

  const register = React.useCallback(
    async (data: LoginInterface) => {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            dispatch(
              setUser({
                email: data.email,
                uid: res.user ? res.user?.uid : "randomUID",
                password: "",
              })
            );
            replaceLoginScreen(history);
          });
      } catch (error) {
        dispatch(
          setNotification({
            text: translations.login_error_message,
            color: colors.fireBrick,
          })
        );
      }
    },
    [history, dispatch]
  );

  const changeStep = React.useCallback(() => {
    clearErrors();
    reset({ email: "", password: "", repeatPassword: "" });
    setStep((prev) => (prev === Steps.LOGIN ? Steps.REGISTER : Steps.LOGIN));
  }, [clearErrors, reset]);

  const submitForm = async (data: LoginInterface) => {
    if (step === Steps.LOGIN) {
      await login(data);
    } else {
      await register(data);
    }
  };

  if (isMounted) {
    return (
      <LoginRegisterScreen
        control={control}
        errors={errors}
        step={step}
        passwordRef={passwordRef}
        changeStep={changeStep}
        handleSubmit={handleSubmit(submitForm)}
      />
    );
  }
  return null;
};

export default LoginRegisterContaienr;
