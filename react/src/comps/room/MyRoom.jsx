import React, { useCallback } from "react";
import { Outlet, Route, Routes, useParams } from "react-router";
import RoomContextProvider from "../../context/RoomContextProvider";
import WitContextProvider from "../../context/WitContextProvider";

import "../../css/myroom/MyRoom.css";
import FolderBox from "./FolderBox";
import FolderDetail from "./FolderDetail";
import FolderInsert from "./FolderInsert";
import RoomWitItem from "./RoomWitItem";

function MyRoom(props) {
  const folderid = "f2223723-c634-47a2-9fd9-cfdfc659d3b7";

  const folderDetailFetch = useCallback(async () => {
    const res = await fetch(
      `http://localhost:5050/${userid}/folder/${folderid}`
    );
    const folderDetail = await res.json();
  });

  return (
    // <Outlet/>
    <div className="myRoomBox">
      <div className="idCard">유저 프로필 정보 들어감</div>
      <div className="userWitList">
        <WitContextProvider>
          <RoomWitItem />
        </WitContextProvider>
      </div>
      <RoomContextProvider>
        <Routes>
          <Route path="/" element={<FolderBox />} />
          {/* <div className="folderBox">
              <FolderBox />
              <FolderInsert />
            </div> */}

          <Route path="/:folderid" element={<FolderDetail />} />
        </Routes>
      </RoomContextProvider>
    </div>
  );
}

export default MyRoom;
