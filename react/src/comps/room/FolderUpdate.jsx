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
  const folderDelete = async (folder) => {
    const id = folder.id;
    const fetch_option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folder),
    };

    console.table(folder);

    if (window.confirm("폴더에 포함된 위트도 삭제하시겠습니까?")) {
      //폴더에 포함된 위트도 삭제하기
      // /:user_id/folder/detail/:id"
      await fetch(
        `http://localhost:5050/myroom/${user_id}/folder/detail/${id}`,
        fetch_option
      );
    } else {
      //폴더만 삭제하기
      await fetch(
        `http://localhost:5050/myroom/${user_id}/folder/${id}`,
        fetch_option
      );
    }
    navigate(`/${user_id}`);
  };

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
          <div className="sudmitbutton" onClick={() => folderDelete(folder)}>
            삭제하기
          </div>
        </div>
      </>
    );
  });
}

export default FolderUpdate;
