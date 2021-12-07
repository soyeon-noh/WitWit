import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRoomContext } from "../../context/RoomContextProvider";

import "../../css/myroom/MyRoomFolder.css";
import FolderIcon from "../../static/img/folder-icon.png";
import FolderInsert from "./FolderInsert";

const FolderBox = () => {
  const { folderList, setFolderList } = useRoomContext();
  const user_id = "@userID";
const navigate = useNavigate()

// 유저의 folder 명 출력하기
  const folderFetch = useCallback(async () => {
    const res = await fetch(`http://localhost:5050/${user_id}`);
    const folder = await res.json();
    await setFolderList(folder);
  }, []);
  useEffect(folderFetch, [folderFetch]);


  // 폴더 이름 클릭시 폴더 해당하는 위트들 출력하도록 url 이동
  const folderDetail = (fId) =>{
    console.log(fId)
    navigate(`folder/${fId}`)
  }

// 폴더 하나하나 map으로 돌려서 출력하기
  const folderlistBox = folderList.map((folder) => {
    return (
      <div className="folder" onClick={()=>folderDetail(folder.id)} >
        <div className="folder-icon">
          <img src={FolderIcon} />
        </div>
        <span>{folder.id}</span>
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
