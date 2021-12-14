import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useRoomContext } from "../../context/RoomContextProvider";
import {
  FolderFindFetch,
  FolderUpdateFetch,
} from "../../functions/FolderFetch";

import "../../css/myroom/FolderUpdate.css";

function FolderUpdate({}) {
  const user_id = "@userID";
  const { id } = useParams("id");
  const { folderList, setFolderList, folder, setFolder } = useRoomContext();
  const navigate = useNavigate();

  // 폴더 정보 찾기
  const folderFind = useCallback(async () => {
    const info = await FolderFindFetch(id);
    await setFolderList(info);
    await setFolder(folderList[0]);
  }, []);
  useEffect(folderFind, [folderFind]);

  //folder 비공개 여부
  const onChecked = () => {
    setFolder({ ...folder, secret: !folder.secret });
  };

  // folder 내용 입력했을 때
  const onChangeHandler = (e) => {
    const folder_name = e.target.value;
    setFolder({ ...folder, name: folder_name });
  };

  // 폴더 정보 수정하기
  const folderUpdate = async (folder) => {
    await FolderUpdateFetch(user_id, folder);
    navigate(`/${user_id}/folder/${id}`);
    folderFind();
  };

  // 폴더 삭제하기
  const folderDelete = () => {};

  return folderList.map((f) => {
    return (
      <>
        <div className="settinglayout">
          <div className="input_box">
            <label>폴더 이름</label>
            <input placeholder={f.name} onChange={onChangeHandler} />
          </div>
          <div className="input_box">
            <label>비공개</label>
            <input
              type="checkbox"
              defaultChecked={f.secret}
              onChange={onChecked}
            />
          </div>
          <div className="sudmitbutton" onClick={() => folderUpdate(folder)}>
            수정하기
          </div>
          <div className="sudmitbutton">삭제하기</div>
        </div>
      </>
    );
  });
}

export default FolderUpdate;
