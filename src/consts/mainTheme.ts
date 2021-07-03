import { createMuiTheme } from "@material-ui/core";
import { colors } from "./colors";

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.bgColor,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.white,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
      containedPrimary: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: 600,
        boxShadow: "none",
        letterSpacing: "normal",
      },
      outlinedPrimary: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: 600,
        paddingTop: "12px",
        paddingBottom: "12px",
        color: "red",
      },
      textSizeSmall: {
        fontSize: "0.75rem",
        lineHeight: 1.33333333,
        fontWeight: 400,
        textDecoration: "underline",
        letterSpacing: "0.4px",
        color: "red",
        padding: 0,
      },
    },
  },
});
