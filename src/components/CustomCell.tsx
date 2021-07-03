import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { colors } from "../consts/colors";
import { CellType } from "../consts/headers/params";
import ButtonCell from "./ButtonCell";

interface Props {
  cellType: CellType;
  width: string;
  val: string;
  buttonValue?: string;
  customStyle?: string;
  textAlign?: "right" | "left";
  buttonColor?: string;
  handleButtonPress?: () => void;
}

function CustomCell(props: Props) {
  const classes = useClasses();
  if (props.cellType === CellType.Text) {
    return (
      <Box
        className={`${classes.textStyle}`}
        style={{
          width: props.width,
          maxWidth: props.width,
          minWidth: props.width,
          textAlign: props.textAlign ? props.textAlign : "left",
        }}
      >
        {props.val}
      </Box>
    );
  }
  if (props.cellType === CellType.Button) {
    if (props.buttonValue && props.handleButtonPress)
      return (
        <ButtonCell
          buttonValue={props.buttonValue}
          textAlign={props.textAlign}
          width={props.width}
          buttonColor={props.buttonColor}
          handleButtonPress={props.handleButtonPress}
        />
      );
  }

  return (
    <Box
      style={{
        width: props.width,
        maxWidth: props.width,
        minWidth: props.width,
      }}
    ></Box>
  );
}

const useClasses = makeStyles({
  textStyle: {
    fontWeight: 500,
    color: colors.white,
    "@media (max-width: 600px)": {
      fontSize: "12px",
    },
    "@media (max-width: 500px)": {
      fontSize: "9px",
    },
  },
});

export default React.memo(CustomCell, (curr, next) => {
  return curr.val === next.val;
});
