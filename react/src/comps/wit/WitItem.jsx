import React, { useCallback, useEffect, useState, useRef } from "react";
import "../../css/wit/WitItem.css";
import { useWitContext } from "../../context/WitContextProvider";

import { styled } from "@mui/system";
import profile from "../../static/img/profile-basic.png";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import moment from "moment";
import "moment/locale/ko";
import WitItemMenu from "./WitItemMenu";


const WitItem = () => {
  const { witList, setWitList } = useWitContext();
  
  // wit list 불러오기
  const witFetch = useCallback(async () => {
    const res = await fetch("http://localhost:5050/");
    const list = await res.json();
    await setWitList(list);
    // console.log(list
  }, []);
  useEffect(witFetch, [witFetch]);


  // 햄버거 메뉴바 스타일 지정
  const MyHamburger = styled(MoreVertIcon) ({
    color : "#ad9fb6",
    cursor:"pointer"
  })

  //wit메뉴창 open plag
  const [witMenuOpen,setWitMenuOpen] = useState(false)
  const witMenuClose =(e) =>{
    setWitMenuOpen(!witMenuOpen)
  }

  const targetChecked = (e) =>{
    const tchecked = e.target.dataset.witid
    console.log("witID : ", tchecked)
  }

  
  return witList.map((wit) => {
    const createAt = wit.createdDate + " " + wit.createdTime;
    const dataid = wit._id
    return (
      <div className="wits" data-witid={dataid} >
        <span className="wit_profile">
          <img src={profile} className="wit_profile" />
        </span>

        <span className="wit_userNick">{wit.userName}</span>
        <span className="wit_userid">{wit.userId}</span>
        <span className="wit_fromNow">
          {moment(Date.parse(createAt)).fromNow()}
        </span>
        <span>{wit.id}</span>
        <span className="wit_menu" onClick={witMenuClose,targetChecked}><MyHamburger />

          {witMenuOpen && 
            <WitItemMenu witMenuClose={witMenuClose} ></WitItemMenu>}
        </span>
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
