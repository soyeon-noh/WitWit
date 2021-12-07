import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";


function FolderDetail({}) {
  const user_id = "@userID";
  const { witList, setWitList } = useWitContext();
  const id = useParams("id") 

  // 폴더 포함 wit 출력
  const folderDetailFetch = useCallback(async () => {
    const res = await fetch(
      `http://localhost:5050/${user_id}/folder/${id}`
    );
    const fWits = await res.json();
    await setWitList(fWits)
  });
  useEffect(folderDetailFetch, [folderDetailFetch])

  return (
    <div className="folderBox">
      {witList && witList.map((wit)=>{
                const createAt = wit.createdDate + " " + wit.createdTime;
                  return (
                    <div className="room_wits">
                        <div className="room_wit_fromNow">
                          {moment(Date.parse(createAt)).fromNow()}
                        </div>
                        <div className="room_wit_text">{wit.text}</div>
                    </div>
                  )
                })
      }
    </div>
    )
}

export default FolderDetail;
