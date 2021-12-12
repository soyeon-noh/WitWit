import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRoomContext } from "../../context/RoomContextProvider";

import "../../css/myroom/MyRoomFolder.css";
import FolderIcon from "../../static/img/folder-icon.png";
import { FolderFetch } from "../../functions/FolderFetch";
import FolderInsert from "./FolderInsert";

const FolderBox = () => {

  const { folderList, setFolderList } = useRoomContext();
  const user_id = "@userID";
  const navigate = useNavigate()


// 유저의 folder 명 출력하기
  const showFolderList = useCallback(async () => {
    const folder = await FolderFetch(user_id)
    await setFolderList(folder);
  }, []);
  useEffect(showFolderList, [showFolderList]);
    

// 폴더 map으로 돌려서 출력하기
  const folderlistBox = folderList.map((folder) => {
    return (
      <div className="folder" onClick={()=>folderDetail(folder.id)} >
        <div className="folder-icon">
          <img src={FolderIcon} />
        </div>
        <span>{folder.name}</span>
      </div>
    );
  });

  // 폴더 이름 클릭시 폴더 해당하는 위트들 출력하도록 url 이동
  const folderDetail = (fId) =>{
    console.log(fId)
    navigate(`folder/${fId}`)
  }

  return (
    <div className="folderBox">
      {folderlistBox}
      <FolderInsert showFolderList={showFolderList}/>
    </div>
  );
};

export default FolderBox;
