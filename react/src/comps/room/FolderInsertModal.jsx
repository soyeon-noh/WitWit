import React, { useCallback, useState } from "react";
import { useRoomContext } from "../../context/RoomContextProvider";
import { FolderInsertFetch } from "../../functions/FolderFetch";

const FolderInsertModal = ({ modalClose, showFolderList }) => {

const user_id="@userID"

  // modal창 인풋, 버튼 제외하고 클릭하였을 때 modal창 닫히도록
  const onModalClose = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  const { folder, setFolder } = useRoomContext();
  const [checked, setChecked] = useState(false);

  // folder 내용 입력했을 때
  const onChangeHandler = (e) => {
    const folder_name = e.target.value;
    setFolder({ ...folder, name: folder_name });
  };

  //folder 비공개 여부
  const onChecked = () => {
    setChecked(!checked);
    setFolder({ ...folder, secret: checked });
    console.log(checked);
  };

  
  // folder insert 함수
  const folderInsert =  async () => {
    console.log(folder)
    console.log(`http://localhost:5050/myroom/${user_id}/folder`)
    await FolderInsertFetch(user_id,folder)
    
    modalClose();
    await showFolderList();
  }


  return (
    <div className="folderInsertMenu" onClick={onModalClose}>
      <input
        placeholder="폴더명 입력하기"
        maxLength="10"
        onChange={onChangeHandler}
      />
      <div className="secretBox">
        <label>비공개폴더</label>
        <input type="checkbox" onChange={onChecked} />
      </div>
      <div onClick={folderInsert}>+ 추가하기</div>
    </div>
  );
};

export default FolderInsertModal;
