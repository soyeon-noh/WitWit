import React, { useEffect, useState } from "react";
import "../../css/wit/WitItem.css";
import { styled } from "@mui/system";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinkIcon from "@mui/icons-material/Link";

import { WitLikeFetch } from "../../functions/LikeFetch";
import WitItemContain from "./WitItemContain";
import { WitMarkFetch } from "../../functions/WitFetch";

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
  useEffect(showWitList, [showWitList]);

  //답글 기능
  const reply = async () => {
    window.alert("답글");
  };

  //위마크
  const witMark = async (wit) => {
    window.alert("위마크하기");
    await WitMarkFetch(wit);
  };

  const propsList = {
    showWitList,
    witList,
    user_id,
    MyHamburger,
    witMenuOpen,
    setWitMenuOpen,
    dataId,
    setDataId,
    witMenuClose,
    like,
    reply,
    witMark,
  };

  return witList.map((wit) => {
    const createAt = wit.createdDate + " " + wit.createdTime;
    return (
      <div className="wits">
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
              wit={wit.originalWit}
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
