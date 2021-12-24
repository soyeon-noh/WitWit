import React, { useCallback } from "react";
import { Outlet } from "react-router";
import { useParams } from "react-router-dom";

import "../../css/myroom/MyRoom.css";
import WitItem from "../wit/WitItem";
import { useWitContext } from "../../context/WitContextProvider";
import { WitFetch } from "../../functions/WitFetch";

function MyRoom() {
  const { setWitList, witList } = useWitContext();
  const {user_id} = useParams()

  // 유저가 쓴 wit list 불러오기
  const showWitList = useCallback(async () => {
    const list = await WitFetch();
    const filter_witlist = list.filter(wit=>{
      return wit.userId === user_id
  })
  setWitList(filter_witlist)
  }, []);

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
