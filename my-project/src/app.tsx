import { h } from "preact";
import { Router } from "preact-router";

// Code-splitting is automated for `routes` directory
import Home from "./routes/home/home";

const App = () => (
  <div >
    <Router>
      <Home path="/" />
    </Router>
  </div>
);

export default App;
