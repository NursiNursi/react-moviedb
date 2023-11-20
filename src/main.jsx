import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
// import { MovieProvider } from "./contexts/MovieContext.jsx";

import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <MovieProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </MovieProvider> */}
  </React.StrictMode>
);
