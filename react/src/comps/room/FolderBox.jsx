import React, { useCallback, useEffect } from "react";
import { useRoomContext } from "../../context/RoomContextProvider";

import "../../css/myroom/MyRoomFolder.css";
import FolderIcon from "../../static/img/folder-icon.png";

const FolderBox = (props) => {
  const { folderList, setFolderList } = useRoomContext();
  // const gridColumnStart = "1";
  // const gridColumnEnd = "2";
  // const gridRowStart = "1";
  // const gridRowEnd = "2";

  // const gridStyles = {
  //   gridColumnStart: { gridColumnStart },
  //   gridColumnEnd: { gridColumnEnd },
  //   gridRowStart: { gridRowStart },
  //   gridRowEnd: { gridRowEnd },
  // };

  const folderFetch = useCallback(async () => {
    const userid = "@userID";
    const res = await fetch(`http://localhost:5050/${userid}`);
    const folder = await res.json();
    await setFolderList(folder);
  }, []);
  useEffect(folderFetch, [folderFetch]);

  return folderList.map((folder) => {
    return (
      <div className="folder">
        <div className="folder-icon">
          <img src={FolderIcon} />
        </div>
        <span>{folder.name}</span>
      </div>
    );
  });
};

export default FolderBox;
