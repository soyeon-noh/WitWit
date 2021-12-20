import React, { useState } from "react";
import { useWitContext } from "../../context/WitContextProvider";
import { useWitWriteContext } from "../../context/WitWriteContextProvider";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import ImageIcon from "@mui/icons-material/Image";

import "../../css/wit/WitReply.css";

import profile from "../../static/img/profile-basic.png";
import { useModalContext } from "../../context/ModalContextProvider";

function WitReply({ parentWit, reply, data_id }) {
  const { wit } = useWitContext();
  const { onChangeHandler, textRef, resize } = useWitWriteContext();
  const { onModalClose, modalControl } = useModalContext();
  const [replyModalFlag, setReplyModalFlag] = useState(false);

  const flagset = () => {
    setReplyModalFlag(!replyModalFlag);
  };

  return (
    <>
      <div className="reply">
        <div className="parent_witBox">
          <span className="wit_profile">
            <img src={profile} className="wit_profile" />
          </span>
          <span className="wit_userNick">{parentWit.userName}</span>
          <span className="wit_userid">{parentWit.userId}</span>
          <span className="exit" onClick={() => modalControl("REPLY")}>
            닫기
          </span>
          <div className="wit_text">{parentWit.text}</div>
        </div>

        <form className="wit_input_box" enctype="multipart/form-data">
          <div className="divBox">
            <SubdirectoryArrowRightIcon className="arrow" />
            <textarea
              type="text"
              maxLength="150"
              value={wit.text}
              onChange={onChangeHandler}
              ref={textRef}
              onKeyDown={resize}
              onKeyUp={resize}
              className="write"
              placeholder="답글을 입력하세요."
            />
            <button onClick={() => reply(parentWit.id, wit, replyModalFlag)}>
              위트하기
            </button>
          </div>

          <div className="etcBox">
            <span className="insertImg">
              <ImageIcon />
              이미지 추가하기
            </span>
            {replyModalFlag ? (
              <span>
                <BookmarkRoundedIcon fontSize="" onClick={flagset} />
              </span>
            ) : (
              <span>
                <BookmarkBorderRoundedIcon fontSize="" onClick={flagset} />
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default WitReply;
