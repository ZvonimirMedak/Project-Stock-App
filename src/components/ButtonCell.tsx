import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { colors } from "../consts/colors";

interface Props {
  buttonValue: string;
  width: string;
  textAlign?: "right" | "left";
  buttonColor?: string;
  handleButtonPress: () => void;
}

const ButtonCell = (props: Props) => {
  const classes = useClasses({
    backgroundColor: props.buttonColor ? props.buttonColor : "",
  });
  return (
    <Box
      style={{
        width: props.width,
        maxWidth: props.width,
        minWidth: props.width,
        textAlign: props.textAlign ? props.textAlign : "left",
      }}
    >
      <Button
        classes={{ root: classes.buttonRoot }}
        className={classes.buttonTextStyle}
        onClick={props.handleButtonPress}
      >
        {props.buttonValue}
      </Button>
    </Box>
  );
};

interface StyledProps {
  backgroundColor: string;
}

const useClasses = makeStyles({
  buttonRoot: (props: StyledProps) => ({
    width: "150px",
    backgroundColor: props.backgroundColor
      ? props.backgroundColor
      : colors.white,
    color: props.backgroundColor ? colors.white : colors.dark,
    "@media (max-width: 1100px)": {
      width: "80px",
    },
    "@media (max-width: 900px)": {
      width: "80px",
    },
    "@media (max-width: 500px)": {
      width: "0px",
    },

    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : colors.white,
      color: props.backgroundColor ? colors.white : colors.dark,
    },
  }),
  buttonTextStyle: {
    fontWeight: "bold",
    "@media (max-width: 600px)": {
      fontSize: "10px",
    },
    "@media (max-width: 500px)": {
      fontSize: "8px",
    },
  },
});

export default ButtonCell;
