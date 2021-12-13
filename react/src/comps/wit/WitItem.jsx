import React, { useEffect, useRef, useState } from "react";
import "../../css/wit/WitItem.css";
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
import { WitFetch } from "../../functions/WitFetch";
import { WitLikeFetch } from "../../functions/LikeFetch";

const WitItem = ({ showWitList, witList }) => {
  const user_id = "@c_a_y";

  // 햄버거 메뉴바 스타일 지정
  const MyHamburger = styled(MoreVertIcon)({
    color: "#ad9fb6",
    cursor: "pointer",
    float: "right",
  });

  //wit메뉴창 open plag
  const [witMenuOpen, setWitMenuOpen] = useState(false);

  // wit id 저장하는 state
  const [dataId, setDataId] = useState("");

  // 메뉴창 열고 닫기
  const witMenuClose = (id) => {
    setWitMenuOpen(!witMenuOpen);
    setDataId(id); // 클릭된 대상의 wit id를 state에 저장
  };

  // 좋아요 기능
  const like = async (user_id, wit) => {
    await WitLikeFetch(user_id, wit);
    showWitList();
  };

  //리위트 기능
  const reWit = async () => {
    window.alert("리위트");
  };

  //북마크
  const witMark = async () => {
    window.alert("위마크");
  };

  return witList.map((wit) => {
    const createAt = wit.createdDate + " " + wit.createdTime;
    return (
      <div className="wits">
        <span className="wit_profile">
          <img src={profile} className="wit_profile" />
        </span>
        <span className="wit_userNick">{wit.userName}</span>
        <span className="wit_userid">{wit.userId}</span>
        <span className="wit_fromNow">
          {moment(Date.parse(createAt)).fromNow()}
        </span>
        <span className="wit_menu" onClick={() => witMenuClose(wit.id)}>
          <MyHamburger />
        </span>
        {witMenuOpen && dataId === wit.id && (
          <WitItemMenu
            witMenuClose={witMenuClose}
            wit_folderId={wit.folder_id}
            data_id={wit.id}
            showWitList={showWitList}
          ></WitItemMenu>
        )}
        <div className="wit_text">{wit.text}</div>
        <div className="icon_box">
          <span>
            <BookmarkBorderRoundedIcon fontSize="" onClick={witMark} />
            <span className="count">{wit.replyCount}</span>
          </span>
          <span>
            <BorderColorRoundedIcon fontSize="" onClick={reWit} />
            <span className="count">{wit.replyCount}</span>
          </span>
          <span>
            <FavoriteBorderRoundedIcon
              fontSize=""
              onClick={() => like(user_id, wit)}
            />{" "}
            <span className="count">{wit.likeyCount}</span>
          </span>
          {/* { likeCheck? 
            <span><FavoriteRoundedIcon fontSize="" color="red" onClick={()=>like(user_id, wit)}/> <span className="count">{wit.likeyCount}</span> </span>
            : <span><FavoriteBorderRoundedIcon fontSize="" onClick={()=>like(user_id, wit)} /><span className="count">{wit.likeyCount}</span></span> 
            }  */}
        </div>
      </div>
    );
  });
};

export default WitItem;
