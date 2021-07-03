import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { mainTheme } from "./consts/mainTheme";
import AuthentificationWrapper from "./wrappers/AuthentificationWrapper";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthentificationWrapper />
    </ThemeProvider>
  );
};

export default App;
