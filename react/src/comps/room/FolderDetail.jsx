import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useRoomContext } from "../../context/RoomContextProvider";

import "../../css/myroom/FolderDetail.css";
import { FolderFindFetch } from "../../functions/FolderFetch";

function FolderDetail({}) {
  const navigate = useNavigate();

  const { user_id } = useParams("user_id");
  const { id } = useParams("id");
  const { folderList, setFolderList } = useRoomContext();

  //뒤로가기 버튼
  const onClickBack = () => {};

  //폴더 수정하기 버튼
  const onClickSetting = () => {
    navigate(`/${user_id}/folder/${id}/folderinfo`);
  };

  // 폴더 정보 찾기
  const folderFind = useCallback(async () => {
    const info = await FolderFindFetch(id);
    await setFolderList(info);
    console.table(folderList);
  }, []);
  useEffect(folderFind, [folderFind]);

  return folderList.map((folder) => {
    return (
      <>
        <div className="folderWitBox">
          <div className="detailheader">
            {folder.name}
            <span className="xBox">x</span>
          </div>
          <div className="detailheaderMenu">
            <span>|</span>
            <span onClick={onClickSetting}>폴더수정</span>
          </div>

          <Outlet />
        </div>
      </>
    );
  });
}

export default FolderDetail;
