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

  // 폴더 정보 찾기
  const folderFind = useCallback(async () => {
    const info = await FolderFindFetch(id);
    await setFolderList(info);
  }, []);
  useEffect(folderFind, [folderFind]);

  //뒤로가기 버튼
  const onClickBack = () => {
    navigate(-1);
  };

  //닫기 버튼
  const onClickClose = () => {
    navigate(`/${user_id}`);
  };

  //폴더 수정하기 버튼
  const onClickSetting = () => {
    navigate(`/${user_id}/folder/${id}/folderinfo`);
  };

  return folderList.map((folder) => {
    return (
      <>
        <div className="folderWitBox">
          <div className="detailheader">
            {folder.name}
            <span className="xBox" onClick={onClickClose}>
              x
            </span>
          </div>
          <div className="detailheaderMenu">
            <span>|</span>
            <span onClick={onClickBack}>←</span>
            <span onClick={onClickSetting}>폴더수정</span>
          </div>

          <Outlet />
        </div>
      </>
    );
  });
}

export default FolderDetail;
