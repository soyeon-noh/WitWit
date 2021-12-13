import "./App.css";
import "./static/fonts/font.css";
import { Bookmark } from "./comps/index.jsx";

import BoardBox from "./comps/BoardBox";
import BoardHeader from "./comps/BoardHeader";
import WitContextProvider from "./context/WitContextProvider";
import RoomContextProvider from "./context/RoomContextProvider";

function App() {
  // const onClickTargetCheck = (e) => {
  //   const target = e.target.className;
  //   console.log(target);
  // };

  return (
    <WitContextProvider>
      <RoomContextProvider>
        <div className="App">
          <section className="bg">
            <div className="bg_img"></div>
          </section>

          <BoardHeader />
          <Bookmark />
          <BoardBox />
        </div>
      </RoomContextProvider>
    </WitContextProvider>
  );
}

export default App;
