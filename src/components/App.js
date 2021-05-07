import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/theme.js";
import Header from "./ui/Header.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Hello!
    </ThemeProvider>
  );
}

export default App;
