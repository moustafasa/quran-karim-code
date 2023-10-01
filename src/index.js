import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./rtk/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// style
import "./sass/components/animations.scss";
import "./sass/components/fonts.scss";
import "./sass/components/globals.scss";
import "./sass/components/controllerBox.scss";
import "./sass/components/errorsHandlers.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
