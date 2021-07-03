import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { colors } from "../consts/colors";

const Spinner = () => {
  const classes = useClasses();
  return (
    <Box className={classes.loading}>
      <CircularProgress className={classes.spinner} />
    </Box>
  );
};

const useClasses = makeStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "auto",
    height: "auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: colors.spinnerBg,
  },
  hidden: {
    display: "none",
  },
  spinner: {
    color: colors.dark,
  },
});

export default Spinner;
