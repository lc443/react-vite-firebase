import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/_global.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { startAuthListener } from "./firebase/authListener.ts";
import React from "react";
import IdleTimerProvider from "./components/IdleTimerProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

  <Provider store={store}>
    <BrowserRouter>
    <IdleTimerProvider>
          <App />
        </IdleTimerProvider>
     
    </BrowserRouter>
  </Provider>
  </React.StrictMode>

 
);
 startAuthListener();
