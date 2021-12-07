import React, { useState } from "react";
import { useRoomContext } from "../../context/RoomContextProvider";

const FolderInsertModal = ({ modalClose, folderFetch }) => {
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

  const onChecked = (e) => {
    setChecked(!checked);
    setFolder({ ...folder, secret: checked });
    console.log(checked);
  };

  // folder insert 함수
  const folderInsert = async () => {
    const fetch_option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folder),
    };

    await fetch(`http://localhost:5050/:user_id/folder`, fetch_option);
    modalClose();
    folderFetch();
  };

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
