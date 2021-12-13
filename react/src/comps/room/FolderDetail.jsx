import React, { useCallback, useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate, useParams } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";

import "../../css/myroom/FolderDetail.css";
import { FolderDetailFetch } from "../../functions/FolderFetch";

import WitItem from "../wit/WitItem";
import FolderDetailWitBox from "./FolderDetailWitBox";

function FolderDetail({}) {
  const navigate = useNavigate();

  const { user_id } = useParams("user_id");
  const { id } = useParams("id");

  //뒤로가기 버튼
  const onClickBack = () => {};

  //뒤로가기 버튼
  const onClickSetting = () => {
    navigate(`/${user_id}/folder/${id}/folderinfo`);
  };

  return (
    <>
      <div className="folderWitBox">
        <div className="detailheader">
          폴더이름
          <spna className="xBox">x</spna>
        </div>
        <div className="detailheaderMenu">
          <span>|</span>
          <span onClick={onClickSetting}>폴더수정</span>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default FolderDetail;
