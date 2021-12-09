import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";

import "../../css/myroom/FolderDetail.css"
import { FolderDetailFetch } from "../../functions/FolderFetch";

import WitItem from "../wit/WitItem";

function FolderDetail({}) {
  const user_id = "@userID";
  const { witList, setWitList } = useWitContext();
  const {id} = useParams("id") 

  
  // 폴더에 포함되는 wit 출력
  const folderDetailFetch = useCallback(async () => {
    const fWits = await FolderDetailFetch(user_id, id)
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
