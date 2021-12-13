import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FolderDetailFetch } from "../../functions/FolderFetch";
import WitItem from "../wit/WitItem";

function FolderDetailWitBox() {
  const { user_id } = useParams("user_id");
  const { id } = useParams("id"); // folder_id

  // 폴더에 해당하는 wit를 출력하기 위한 임시 state
  const [_witList, _setWitList] = useState([]);

  // 폴더에 포함되는 wit 출력
  const folderDetailFetch = useCallback(async () => {
    const fWits = await FolderDetailFetch(user_id, id);
    _setWitList(fWits);
  }, []);
  useEffect(folderDetailFetch, [folderDetailFetch]);

  return (
    <div className="detailWitBox">
      {_witList && (
        <WitItem showWitList={folderDetailFetch} witList={_witList} />
      )}
    </div>
  );
}

export default FolderDetailWitBox;
