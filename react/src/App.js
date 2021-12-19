import "./App.css";
import "./static/fonts/font.css";
import { Bookmark } from "./comps/index.jsx";

import BoardBox from "./comps/BoardBox";
import BoardHeader from "./comps/BoardHeader";
import { useModalContext } from "./context/ModalContextProvider";

function App() {

  const {onCloseControl} = useModalContext()

  return (
        <div className="App" onClick={onCloseControl}>
          <section className="bg">
            <div className="bg_img"></div>
          </section>

          <BoardHeader />
          <Bookmark />
          <BoardBox />
        </div>
  );
}

export default App;
