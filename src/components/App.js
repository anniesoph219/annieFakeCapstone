import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/theme.js";
import Header from "./ui/Header.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route
            exact
            path="/createmeal"
            component={() => <div>Create meal</div>}
          />
          <Route exact path="/login" component={() => <div>Login</div>} />
          <Route exact path="/signup" component={() => <div>Signup</div>} />
          <Route
            exact
            path="/browse"
            component={() => <div>Browse Meals</div>}
          />
          <Route exact path="/host" component={() => <div>Host</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
