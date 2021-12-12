import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/wit/WitItemMenu.css";
import { WitDelete, WitFetch, WitInFolderFetch } from "../../functions/WitFetch";
import { FolderFetch } from "../../functions/FolderFetch"
import { useRoomContext } from "../../context/RoomContextProvider";

function WitItemMenu({ data_id, witMenuClose,showWitList,wit_folderId }) {


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

  //폴더 담기
  const witInFolder = async(data_id, list) =>{
    const id = data_id;
    const folder_id = list.id
    if(window.confirm("담으실래요?")){
      await WitInFolderFetch(id,folder_id, list);
      await WitFetch();
    }
    witMenuClose();
  }


  return (
    <div className="witmenu" id={data_id} onClick={onWitMenuClose}>
      <p onClick={witDelete}>삭제하기</p>
      {folderNameList ? 
        <p onClick={onFolderOpen}>폴더담기</p> 
        : folderList.map((list)=>{
            return(
              wit_folderId == list.id?
              <p className="menu_foldername foldercheck" onClick={()=>witInFolder(data_id, list)}>{list.name}</p>
              : <p className="menu_foldername" onClick={()=>witInFolder(data_id, list)}>{list.name}</p>
            )
          })
      }
      
    </div>
  );
}

export default WitItemMenu;
