import React, { useCallback } from "react";
import { Outlet } from "react-router";

import "../../css/myroom/MyRoom.css";
import WitItem from "../wit/WitItem";
import { useWitContext } from "../../context/WitContextProvider";
import { WitFetch } from "../../functions/WitFetch";
import { useEffect } from "react";

function MyRoom() {
  const { setWitList, witList } = useWitContext();
  const user_id = "@c_a_y";

  // wit list 불러오기
  const showWitList = useCallback(async () => {
    const list = await WitFetch();

    list.map((wit) => {
      if (wit.userId === user_id) {
        setWitList((witList) => [...witList, wit]);
      }
    });
  }, []);
  useEffect(showWitList, [showWitList]);

  return (
    <div className="myRoomBox">
      <div className="idCard">유저 프로필 정보 들어감</div>
      <div className="userWitList">
        <WitItem showWitList={showWitList} witList={witList} />
      </div>
      <Outlet />
    </div>
  );
}

export default MyRoom;
