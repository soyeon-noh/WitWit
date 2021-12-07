import React from "react";
import { Outlet} from "react-router";
import RoomContextProvider from "../../context/RoomContextProvider";
import WitContextProvider from "../../context/WitContextProvider";

import "../../css/myroom/MyRoom.css";
import RoomWitItem from "./RoomWitItem";

function MyRoom(props) {
  return (
    <div className="myRoomBox">
      <div className="idCard">유저 프로필 정보 들어감</div>
      <div className="userWitList">
        <WitContextProvider>
          <RoomWitItem />
        </WitContextProvider>
      </div>
      <RoomContextProvider>
        <Outlet />
      </RoomContextProvider>
    </div>
  );
}

export default MyRoom;
