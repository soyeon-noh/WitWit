import React, { useCallback, useEffect } from "react";
import { useRoomContext } from "../../context/RoomContextProvider";

import "../../css/myroom/MyRoomFolder.css";
import FolderIcon from "../../static/img/folder-icon.png";
import FolderInsert from "./FolderInsert";

const FolderBox = () => {
  const { folderList, setFolderList } = useRoomContext();
  const userid = "@userID";
  const folderFetch = useCallback(async () => {
    const res = await fetch(`http://localhost:5050/${userid}`);
    const folder = await res.json();
    await setFolderList(folder);
  }, []);
  useEffect(folderFetch, [folderFetch]);

  const folderlistBox = folderList.map((folder) => {
    return (
      <div className="folder" onClick={folderDetail}>
        <div className="folder-icon">
          <img src={FolderIcon} />
        </div>
        <span>{folder.name}</span>
      </div>
    );
  });

  return (
    <div className="folderBox">
      {folderlistBox}
      <FolderInsert folderFetch={folderFetch} />
    </div>
  );
};

export default FolderBox;
