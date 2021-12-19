import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ModalContextProvider from "./context/ModalContextProvider";
import WitContextProvider from "./context/WitContextProvider";
import RoomContextProvider from "./context/RoomContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <WitContextProvider>
    <RoomContextProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
    </RoomContextProvider>
    </WitContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
