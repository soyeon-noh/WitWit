import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";

import "../../css/myroom/FolderDetail.css"

import WitItem from "../wit/WitItem";

function FolderDetail({}) {
  const user_id = "@userID";
  const { witList, setWitList } = useWitContext();
  const {id} = useParams("id") 

  // 폴더 포함 wit 출력
  const folderDetailFetch = useCallback(async () => {
    const res = await fetch(
      `http://localhost:5050/${user_id}/folder/${id}`
    );
    const fWits = await res.json();
    console.log("userid : ", user_id)
    console.log("folderid : ", id)
    console.log("wits : ", fWits)
    await setWitList(fWits)
  },[]);
  useEffect(folderDetailFetch, [folderDetailFetch])

  


  return (
    <div className="foldeWitBox">
      {witList && <WitItem witFetch={folderDetailFetch} />}
    </div>
    )
}

export default FolderDetail;
