import React, { useEffect, useState } from "react";
import "../../css/wit/WitItem.css";
import LinkIcon from "@mui/icons-material/Link";

import { useWitContext } from "../../context/WitContextProvider";
import { WitLikeFetch } from "../../functions/LikeFetch";
import WitItemContain from "./WitItemContain";
import {
  WitFetch,
  WitMarkFetch,
  WitQuoteFetch,
  WitReplyFetch,
} from "../../functions/WitFetch";
import { useNavigate } from "react-router-dom";
import { useWitWriteContext } from "../../context/WitWriteContextProvider";
import WitQuote from "./WitQuote";

const WitItem = ({ showWitList, witList }) => {
  const user_id = "@c_a_y";
  const navigate = useNavigate();
  const { wit, setWit } = useWitContext();
  const { textReset } = useWitWriteContext();

  // 좋아요 기능
  const like = async (user_id, wit) => {
    await WitLikeFetch(user_id, wit);
    showWitList();
  };
  useEffect(showWitList, [showWitList]);

  //답글 기능
  const reply = async (parentWit, wit, replyModalFlag) => {
    const witId = parentWit;
    if (replyModalFlag) {
      await WitQuoteFetch(wit, witId); // true 인용하기
    } else {
      await WitReplyFetch(wit, witId); // false 답글달기
    }
    await WitFetch();
    await showWitList();
    textReset();
  };

  //위마크
  const witMark = async (_wit) => {
    const _witId = _wit.id;
    // 위마크할 위트 내용 재정립
    setWit({
      ...wit,
      text: _wit.text,
      userId: _wit.userId,
      userName: _wit.userName,
    });
    textReset();
    await WitMarkFetch(wit, _witId);
    showWitList();
  };

  // 위트 눌렀을 때 위트의 디테일 화면으로 들어가기
  const intoWitDetail = (wit) => {
    // const wit_id = wit.id;
    // navigate(`/wit/${wit_id}`);
  };

  const propsList = {
    user_id,
    like,
    reply,
    witMark,
  };

  return witList.map((wit) => {
    const createAt = wit.createdDate + " " + wit.createdTime;
    var createAtO = null;
    if (wit.originalWit[0]) {
      createAtO =
        wit.originalWit[0].createdDate + " " + wit.originalWit[0].createdTime;
    }
    return (
      <div className="wits" onClick={() => intoWitDetail(wit)}>
        {wit.text === "" && wit.originalWit ? ( //위마크
          <>
            <span className="wemarkCheckingBox">
              <span>
                <LinkIcon fontSize="1rem" />
                &nbsp;<b>{user_id}</b>님이 위마크한 위트입니다
              </span>
            </span>
            <WitItemContain
              propsList={propsList}
              wit={wit.originalWit[0]}
              createAt={createAtO}
            ></WitItemContain>
          </>
        ) : !(wit.text === "") && wit.originalWit[0] ? ( // 인용하기
          <WitQuote
            propsList={propsList}
            wit={wit}
            createAt={createAt}
            createAtO={createAtO}
          />
        ) : wit.parentWit ? ( //답글
          <>
            <span className="wemarkCheckingBox">
              <span>
                &nbsp;<b>{wit.parentWit.userId}</b>님께 보내는 답글입니다
              </span>
            </span>
            <WitItemContain
              propsList={propsList}
              wit={wit}
              createAt={createAt}
            ></WitItemContain>
          </>
        ) : (
          <WitItemContain
            propsList={propsList}
            wit={wit}
            createAt={createAt}
          ></WitItemContain>
        )}
      </div>
    );
  });
};

export default WitItem;
