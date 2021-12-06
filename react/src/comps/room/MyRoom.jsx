import React from "react";
import { Outlet,useParams } from "react-router";
import RoomContextProvider from "../../context/RoomContextProvider";
import WitContextProvider from "../../context/WitContextProvider";

import "../../css/myroom/MyRoom.css";
import FolderBox from "./FolderBox";
import FolderInsert from "./FolderInsert";
import RoomWitItem from "./RoomWitItem";


function MyRoom(props) {
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
        <div className="folderBox">
          <FolderBox />
          <FolderInsert />
          
        </div>
      </RoomContextProvider>
    </div>
  );
}

export default MyRoom;
