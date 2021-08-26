import { h } from "preact";
import { Router } from "preact-router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import { lightTheme } from "./styled/theme";
import GlobalStyle from "./styled/globalStyle";
import { ThemeProvider } from "styled-components";
import { WeatherWidgetProvider } from "./contexts/WeatherWidgetContext";

// Code-splitting is automated for `routes` directory
import Home from "./routes/home/home";

const client = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
});

const App = () => (
  <>
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <WeatherWidgetProvider>
          <GlobalStyle />
          <Router>
            <Home path="/" />
          </Router>
        </WeatherWidgetProvider>
      </ThemeProvider>
    </ApolloProvider>
  </>
);

export default App;
