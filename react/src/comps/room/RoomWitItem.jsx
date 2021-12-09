import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useWitContext } from "../../context/WitContextProvider";

import "../../css/myroom/MyRoomWits.css";
import { WitFetch } from "../../functions/WitFetch";

function RoomWitItem() {

  const { witList, setWitList } = useWitContext();

  // MyRoom 나의 위트를 출력
  const showWitList = useCallback(async () => {
   const list = await WitFetch()
    await setWitList(list);
  }, []);
  useEffect(showWitList, [showWitList]);

  
  return witList.map((wit) => {
    const createAt = wit.createdDate + " " + wit.createdTime;

    return (
      <div className="room_wits">
        <div className="room_wit_fromNow">
          {moment(Date.parse(createAt)).fromNow()}
        </div>
        <div className="room_wit_text">{wit.text}</div>
      </div>
    );
  });
}

export default RoomWitItem;
