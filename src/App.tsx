import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";

import { mainTheme } from "./consts/mainTheme";
import store from "./reducers";
import AuthentificationWrapper from "./wrappers/AuthentificationWrapper";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <AuthentificationWrapper />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
