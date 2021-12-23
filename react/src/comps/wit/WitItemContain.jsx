import profile from "../../static/img/profile-basic.png";

import { styled } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import {ReactComponent as IconHeart01 } from "../../static/icons/icon-heart.svg"

import moment from "moment";
import "moment/locale/ko";
import WitItemMenu from "./WitItemMenu";
import { useModalContext } from "../../context/ModalContextProvider";
import WitReply from "./WitReply";
import { useNavigate } from "react-router-dom";

function WitItemContain({ propsList, wit, createAt }) {

  const { user_id, like, reply, witMark } = propsList;

  //모달창 plag변수
  const { modalFlag, modalControl, dataId } = useModalContext();
  const navigate = useNavigate();

  // 햄버거 메뉴바 스타일 지정
  const MyHamburger = styled(MoreVertIcon)({
    color: "#ad9fb6",
    cursor: "pointer",
    float: "right",
  });

  // 위트 눌렀을 때 위트의 디테일 화면으로 들어가기
  const intoWitDetail = (wit) => {
    const wit_id = wit.id;
    navigate(`/wit/${wit_id}`);
  };


  return (
    <>
      <span className="wit_profile">
        <img src={profile} className="wit_profile" />
      </span>
      <span className="wit_userNick">{wit.userName}</span>
      <span className="wit_userid">{wit.userId}</span>
      <span className="wit_fromNow">
        {moment(Date.parse(createAt)).fromNow()}
      </span>
      <span className="wit_menu" onClick={() => modalControl("MENU", wit.id)}>
        <MyHamburger />
      </span>
      {modalFlag.menu && dataId === wit.id && (
        <WitItemMenu
          wit_folderId={wit.folder_id}
          data_id={wit.id}
        ></WitItemMenu>
      )}
      <div className="wit_text" onClick={()=>intoWitDetail(wit)}>{wit.text}</div>
      <div>
        {wit.fileArray && wit.fileArray.map((item)=>{
          return( 
            <>
            <div>이미지</div>
            </>
          )})
        }
      </div>
      <div className="icon_box">
        <span>
          <BookmarkBorderRoundedIcon fontSize="" onClick={() => witMark(wit)} />
          <span className="count">0</span>
        </span>
        <span>
          <BorderColorRoundedIcon
            fontSize=""
            onClick={() => modalControl("REPLY", wit.id)}
          />
          <span className="count">{wit.replyCount}</span>
        </span>
        <span>
          {/* <span className="icon"><IconHeart01 style={iconStyle} onClick={() => like(user_id, wit)}/></span>
          <span className="count">{wit.likeyCount}</span>  */}
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
      {modalFlag.reply && dataId === wit.id && (
        <WitReply data_id={wit.id} reply={reply} parentWit={wit}></WitReply>
      )}
    </>
  );
}

export default WitItemContain;
