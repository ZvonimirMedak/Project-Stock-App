import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { colors } from "../consts/colors";

interface Props {
  title: string;
}

const Header = (props: Props) => {
  const classes = useClasses();
  return (
    <Box className={classes.titleContainer}>
      <Typography component="h1" variant="h3" className={classes.titleText}>
        {props.title}
      </Typography>
    </Box>
  );
};

const useClasses = makeStyles({
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: colors.white,
    "@media (max-width: 700px)": {
      fontSize: "26px",
      paddingTop: "10px",
      marginLeft: "30px",
    },
  },
});

export default Header;
