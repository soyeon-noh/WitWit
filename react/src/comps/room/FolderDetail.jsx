import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";

import "../../css/myroom/FolderDetail.css"
import { FolderDetailFetch } from "../../functions/FolderFetch";

import WitItem from "../wit/WitItem";



function FolderDetail({}) {
  const user_id = "@userID";

  // 폴더에 해당하는 wit를 출력하기 위한 임시 state
  const [_witList, _setWitList] = useState([]);

  const {id} = useParams("id") 

  // 폴더에 포함되는 wit 출력
  const folderDetailFetch = useCallback(async () => {
    const fWits = await FolderDetailFetch(user_id, id)
    _setWitList(fWits)
  },[]);
  useEffect(folderDetailFetch, [folderDetailFetch])




  return (
    <>
      <div className="folderWitBox">
      <div className="detailheader">ggg</div>
        {_witList && <WitItem showWitList={folderDetailFetch} witList={_witList}/>}
      </div>
    </>
    )
}

export default FolderDetail;
