import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useRoomContext } from "../../context/RoomContextProvider";
import { FolderFindFetch } from "../../functions/FolderFetch";

function FolderUpdate({}) {
  const { id } = useParams("id");
  const { folderList, setFolderList } = useRoomContext();

  // 폴더 정보 찾기
  const folderFind = useCallback(async () => {
    const info = await FolderFindFetch(id);
    await setFolderList(info);
    console.table(folderList);
  }, []);
  useEffect(folderFind, [folderFind]);

  return folderList.map((folder) => {
    return (
      <>
        <div>
          <label></label>
          <input value={folder.name} />
        </div>
        <div>{folder.user_id}</div>
        <div>{folder.secret ? <p>true</p> : <p>false</p>}</div>
      </>
    );
  });
}

export default FolderUpdate;
