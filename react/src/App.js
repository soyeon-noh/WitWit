import "./App.css";
import "./static/fonts/font.css";
import { Bookmark, MyRoom, Login, Join, WitHome } from "./comps/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import logo1 from "./static/img/logo1.svg";
import BoardBox from "./comps/BoardBox";
import BoardHeader from "./comps/BoardHeader";
import WitContextProvider from "./context/WitContextProvider";

function App() {
  return (
    <WitContextProvider>
      <div className="App">
        <section className="bg">
          <div className="bg_img"></div>
        </section>

        <BoardHeader />
        <Bookmark />
        <BoardBox />
      </div>
    </WitContextProvider>
  );
}

export default App;
