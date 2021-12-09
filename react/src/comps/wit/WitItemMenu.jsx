import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/wit/WitItemMenu.css";
import { WitDelete } from "../../functions/WitFetch";
import { FolderFetch } from "../../functions/FolderFetch"
import { useRoomContext } from "../../context/RoomContextProvider";

function WitItemMenu({ data_id, witMenuClose,showWitList }) {
  const navigate = useNavigate();
  const user_id = "@userID"
  const { folderList, setFolderList } = useRoomContext();
  const [folderNameList, setFolderNameList] = useState(true)

// menu 모달 닫는 함수
  const onWitMenuClose = (e) => {
    if (e.target === e.currentTarget) {
      witMenuClose();
    }
  };

  // 위트 삭제함수
  const witDelete = async (e) => {
    const id = data_id;
    const user_id = "@userID";

    if (window.confirm("삭제하시겠습니까?")) {
      await WitDelete(user_id, id)
      await showWitList();
    }
  };

  // 폴더담기 누르면 유저 id 보내서 유저의 폴더 리스트를 출력해줌
  const onFolderOpen =async() =>{
    setFolderNameList(!folderNameList)
    const list = await FolderFetch(user_id)
    await setFolderList(list);
  }

  const witInFolder = (list) =>{
    window.confirm("담으실래요?")
  }

  return (
    <div className="witmenu" id={data_id} onClick={onWitMenuClose}>
      <p onClick={witDelete}>삭제하기</p>
      {folderNameList ? 
        <p onClick={onFolderOpen}>폴더담기</p> : 
        folderList.map((list)=>{
          return(<p className="menu_foldername" onClick={()=>witInFolder(list)}>{list.name}</p>)
        })
      }
      
    </div>
  );
}

export default WitItemMenu;
