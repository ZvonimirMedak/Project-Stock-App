import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { loginFields, Steps } from "../containers/LoginRegisterContaienr";
import { useTranslation } from "react-i18next";
import { translations } from "../i18n/translation";
import { loginAndCreateRules } from "../consts/rulesFunction";
import { colors } from "../consts/colors";

interface Props {
  errors: Record<string, any>;
  control: Control<Record<string, any>>;
  step: Steps;
  passwordRef: React.MutableRefObject<{}>;
  changeStep: () => void;
  handleSubmit: () => void;
}

const LoginRegisterScreen = (props: Props) => {
  const classes = useClasses();
  const { t } = useTranslation();

  const titleText = React.useMemo(
    () =>
      props.step === Steps.LOGIN
        ? t(translations.login_to_your_account)
        : t(translations.register),
    [props.step, t]
  );

  const linkText = React.useMemo(
    () =>
      props.step === Steps.LOGIN
        ? t(translations.dont_have_an_account)
        : t(translations.allready_have_an_account),
    [props.step, t]
  );

  const submitButtonText = React.useMemo(
    () =>
      props.step === Steps.LOGIN
        ? t(translations.login)
        : t(translations.register_account),
    [props.step, t]
  );

  const RepeatPasswordField = React.useMemo(() => {
    if (props.step === Steps.REGISTER) {
      return (
        <FormControl classes={{ root: classes.formContainer }}>
          <Controller
            name={loginFields.repeatPassword}
            defaultValue=""
            rules={{
              validate: (value: string) =>
                value === props.passwordRef.current ||
                t(translations.password_doesnt_match).toString(),
            }}
            control={props.control}
            render={({ field }) => (
              <TextField
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                label={t(translations.repeat_password)}
                error={typeof props.errors.repeatPassword !== "undefined"}
                type="password"
              />
            )}
          />
          <FormHelperText
            error
            style={{
              visibility: props.errors.repeatPassword ? "visible" : "hidden",
            }}
          >
            <span>{props.errors.repeatPassword?.message}</span>
          </FormHelperText>
        </FormControl>
      );
    }
    return null;
  }, [
    props.step,
    props.control,
    props.errors,
    classes.formContainer,
    t,
    props.passwordRef,
  ]);

  return (
    <Box className={classes.mainContainer}>
      <Box boxShadow={4} className={classes.innerContainer}>
        <Box>
          <Typography
            component="h1"
            variant="h3"
            classes={{ root: classes.titleStyle }}
          >
            {titleText}
          </Typography>
        </Box>
        <FormControl className={classes.formContainer}>
          <Controller
            defaultValue=""
            control={props.control}
            name={loginFields.email}
            rules={loginAndCreateRules.rules(t).email}
            render={({ field }) => (
              <TextField
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                label={t(translations.email)}
                type="text"
              />
            )}
          />
          <FormHelperText
            error
            style={{ visibility: props.errors.email ? "visible" : "hidden" }}
          >
            <span>{props.errors.email?.message}</span>
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formContainer}>
          <Controller
            defaultValue=""
            control={props.control}
            name={loginFields.password}
            rules={loginAndCreateRules.rules(t).password}
            render={({ field }) => (
              <TextField
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                type="password"
                label={t(translations.password)}
              />
            )}
          />
          <FormHelperText
            error
            style={{ visibility: props.errors.password ? "visible" : "hidden" }}
          >
            <span>{props.errors.password?.message}</span>
          </FormHelperText>
        </FormControl>
        {RepeatPasswordField}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={props.handleSubmit}
          classes={{ root: classes.submitButton }}
        >
          {submitButtonText}
        </Button>
        <Box className={classes.linkContainer}>
          <Link className={classes.linkText} onClick={props.changeStep}>
            {linkText}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const useClasses = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: colors.bgColor,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "calc(20vw + 250px)",
    minHeight: "70vh",
    backgroundColor: colors.white,
  },
  titleStyle: {
    fontWeight: "bold",
    padding: 30,
    fontSize: "calc(24px + 2.1vw)",
  },
  formContainer: {
    width: "70%",
    padding: 15,
  },
  submitButton: {
    width: "70%",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 40,
    fontSize: "calc(14px + 0.3vw)",
  },
  linkContainer: {
    marginTop: 35,
    paddingBottom: 15,
  },
  linkText: {
    fontSize: 18,
    cursor: "pointer",
  },
});

export default LoginRegisterScreen;
