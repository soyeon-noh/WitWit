import React, { useEffect, useState } from "react";
import "../../css/wit/WitItem.css";
import LinkIcon from "@mui/icons-material/Link";

import { useWitContext } from "../../context/WitContextProvider";
import { WitLikeFetch } from "../../functions/LikeFetch";
import WitItemContain from "./WitItemContain";
import { WitMarkFetch } from "../../functions/WitFetch";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../context/ModalContextProvider";

const WitItem = ({showWitList, witList}) => {
  const user_id = "@c_a_y";
  const navigate = useNavigate();
  const { wit, setWit, } = useWitContext();
  const {} = useModalContext();


  // 좋아요 기능
  const like = async (user_id, wit) => {
    await WitLikeFetch(user_id, wit);
    showWitList();
  };
  useEffect(showWitList, [showWitList]);

  //답글 기능
  const reply = async () => {
    window.alert("답글");
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
    await WitMarkFetch(wit, _witId);
  };

  // 위트 눌렀을 때 위트의 디테일 화면으로 들어가기
  const intoWitDetail = (wit) => {
    // navigate(`/wit/${wit.id}`);
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
    if (wit.text === "" && wit.originalWit[0]) {
      const createdDate = wit.originalWit[0].createdDate;
      const createdTime = wit.originalWit[0].createdTime;
      createAtO = createdDate + " " + createdTime;
    }

    return (
      <div className="wits" onClick={() => intoWitDetail(wit)}>
        {wit.text === "" && wit.originalWit ? (
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
