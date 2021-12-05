import React from "react";
import { useRoomContext } from "../../context/RoomContextProvider";

import "../../css/myroom/MyRoomFolder.css";
import FolderIcon from "../../static/img/folder-icon.png";

const FolderBox = () => {
  const { folderList } = useRoomContext();
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
