import React from "react";
import { Outlet} from "react-router";

import "../../css/myroom/MyRoom.css";
import RoomWitItem from "./RoomWitItem";

function MyRoom(props) {
  return (
    <div className="myRoomBox">
      <div className="idCard">유저 프로필 정보 들어감</div>
      <div className="userWitList">
          <RoomWitItem />
      </div>
      <Outlet />
    </div>
  );
}

export default MyRoom;
