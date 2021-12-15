import React, { useCallback } from "react";
import { Outlet } from "react-router";

import "../../css/myroom/MyRoom.css";
import RoomWitItem from "./RoomWitItem";
import WitItem from "../wit/WitItem";
import { useWitContext } from "../../context/WitContextProvider";
import { WitFetch } from "../../functions/WitFetch";
import { useEffect } from "react";

function MyRoom() {
  const { setWitList, witList } = useWitContext();

  // wit list 불러오기
  const showWitList = useCallback(async () => {
    const list = await WitFetch();
    await setWitList(list);
  }, []);
  useEffect(showWitList, [showWitList]);

  return (
    <div className="myRoomBox">
      <div className="idCard">유저 프로필 정보 들어감</div>
      <div className="userWitList">
        {/* <RoomWitItem /> */}
        <WitItem showWitList={showWitList} witList={witList} />
      </div>
      <Outlet />
    </div>
  );
}

export default MyRoom;
