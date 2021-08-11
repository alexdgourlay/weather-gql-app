import { h } from "preact";
import { Router } from "preact-router";

import { lightTheme, darkTheme } from "./styled/theme";
import GlobalStyle from "./styled/globalStyle";
import { ThemeProvider } from "styled-components";
import { WeatherWidgetProvider } from "./contexts/WeatherWidgetContext";

// Code-splitting is automated for `routes` directory
import Home from "./routes/home/home";

const App = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <ThemeProvider theme={lightTheme}>
      <WeatherWidgetProvider>
        <GlobalStyle />
        <Router>
          <Home path="/" />
        </Router>
      </WeatherWidgetProvider>
    </ThemeProvider>
  </>
);

export default App;
