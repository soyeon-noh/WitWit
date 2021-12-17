import React from "react";
import "../css/BoardBox.css";

import { Route, Routes } from "react-router-dom";
import WitHome from "./wit/WitHome";
import WitDetail from "./wit/WitDetaill";
import MyRoom from "./room/MyRoom";
import Login from "./Login";
import Join from "./Join";
import FolderDetail from "./room/FolderDetail";
import FolderBox from "./room/FolderBox";
import FolderUpdate from "./room/FolderUpdate";
import FolderDetailWitBox from "./room/FolderDetailWitBox";

function BoardBox() {
  return (
    <section className="board_box">
      <section className="board">
        <Routes>
          <Route path="" element={<WitHome />}>
            <Route path="/wit/:wit_id" element={<WitDetail />} />
          </Route>

          <Route path=":user_id" element={<MyRoom />}>
            <Route path="" element={<FolderBox />} />
            <Route path="folder/:id" element={<FolderDetail />}>
              <Route path="" element={<FolderDetailWitBox />} />
              <Route path="folderinfo" element={<FolderUpdate />} />
            </Route>
          </Route>

          <Route extract path="login" element={<Login />} />
          <Route extract path="signup" element={<Join />} />
        </Routes>
      </section>
    </section>
  );
}

export default BoardBox;
