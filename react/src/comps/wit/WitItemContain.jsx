import profile from "../../static/img/profile-basic.png";

import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import moment from "moment";
import "moment/locale/ko";
import WitItemMenu from "./WitItemMenu";

function WitItemContain({ propsList, wit, createAt }) {
  const {
    showWitList,
    user_id,
    MyHamburger,
    witMenuOpen,
    dataId,
    witMenuClose,
    like,
    reply,
    witMark,
  } = propsList;

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
          <BookmarkBorderRoundedIcon fontSize="" onClick={() => witMark(wit)} />
          <span className="count">{wit.replyCount}</span>
        </span>
        <span>
          <BorderColorRoundedIcon fontSize="" onClick={reply} />
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
    </>
  );
}

export default WitItemContain;
