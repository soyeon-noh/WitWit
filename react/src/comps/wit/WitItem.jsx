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
import { useWitWriteContext } from "../../context/WitWriteContextProvider";
import WitQuote from "./WitQuote";



const WitItem = ({showWitList, witList }) => {
  const user_id = "@c_a_y";
  const { wit, setWit} = useWitContext();
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
    // 위마크할 위트 내용 재정립
    setWit({
      ...wit,
      text: _wit.text,
      userId: _wit.userId,
      userName: _wit.userName,
    });
    textReset();
    console.log("^^ wit : ",wit)
    console.log("^^ _wit : ",_wit)
    await WitMarkFetch(wit, _wit);
    showWitList();
  };


  const propsList = {
    user_id,
    like,
    reply,
    witMark,
  };

  console.log("WitItem",witList)

  return witList.map((wit) => {
    const createAt = wit.createdDate + " " + wit.createdTime;
    var createAtO = null;
    var originCheck = false;
    // console.log("왜 오리지널위트가 안나오죠",wit.originalWit)
    if (wit.originalWit) {
      originCheck =true
      createAtO =
        wit.originalWit.createdDate + " " + wit.originalWit.createdTime;
    }
    return (
      <div className="wits">

    

      {wit.text === "" && originCheck 
      //위마크 
      ? ( <>    
          <span className="wemarkCheckingBox"> 
            <span>
              <LinkIcon fontSize="1rem" />
              &nbsp;<b>{user_id}</b>님이 위마크한 위트입니다
            </span>
          </span>
          <WitItemContain
            propsList={propsList}
            wit={wit.originalWit}
            createAt={createAtO}
          ></WitItemContain>
        </> ) 
      : wit.text !== "" && originCheck ? ( // 인용하기
        <WitQuote
          propsList={propsList}
          wit={wit}
          createAt={createAt}
          createAtO={createAtO}
        /> ) 
      : wit.parentWit ? ( //답글
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
        </> )
      : (
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
