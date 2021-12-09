import React, { useState } from "react";
import "../../css/wit/WitItem.css";
import { useWitContext } from "../../context/WitContextProvider";

import { styled } from "@mui/system";
import profile from "../../static/img/profile-basic.png";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import moment from "moment";
import "moment/locale/ko";
import WitItemMenu from "./WitItemMenu";

const WitItem = ({showWitList}) => {
  const { witList } = useWitContext();

  // 햄버거 메뉴바 스타일 지정
  const MyHamburger = styled(MoreVertIcon)({
    color: "#ad9fb6",
    cursor: "pointer",
  });

  //wit메뉴창 open plag
  const [witMenuOpen, setWitMenuOpen] = useState(false);

  // wit id 저장하는 state
  const [dataId, setDataId] = useState("");

  const witMenuClose = (id) => {
    setWitMenuOpen(!witMenuOpen);
    setDataId(id); // 클릭된 대상의 wit id를 state에 저장
  };

  
  return witList.map((wit) => {
    const createAt = wit.createdDate + " " + wit.createdTime;
    return (
      <div className="wits">
        <span className="wit_profile">
          <img src={profile} className="wit_profile" />
        </span>
        <span className="wit_userNick">{wit.userName}</span>
        <span className="wit_userid">{wit.user_id}</span>
        <span className="wit_fromNow">
          {moment(Date.parse(createAt)).fromNow()}
        </span>
        <span className="wit_menu" onClick={() => witMenuClose(wit.id)}>
          <MyHamburger />
        </span>
        {witMenuOpen && dataId === wit.id && (
          <WitItemMenu
            witMenuClose={witMenuClose}
            data_id={wit.id}
            showWitList={showWitList}
          ></WitItemMenu>
        )}
        <div className="wit_text">{wit.text}</div>
        <div className="icon_box">
          <span>
            <BookmarkBorderRoundedIcon fontSize="" />
          </span>
          <span>
            <BorderColorRoundedIcon fontSize="" />
          </span>
          <span>
            <FavoriteBorderRoundedIcon fontSize="" />
          </span>
        </div>
      </div>
    );
  });
};

export default WitItem;
