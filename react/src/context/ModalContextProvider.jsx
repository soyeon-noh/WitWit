import React, { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const AppContext = createContext();
export const useModalContext = () => {
  return useContext(AppContext);
};

function ModalContextProvider({ children }) {
  // open plag
  const [modalFlag, setModalFlag] = useState({
    menu: false,
    reply: false,
  });

  // 클릭대상 id 저장하는 state
  const [dataId, setDataId] = useState("");

  // 모달창 열고 닫기 컨트롤
  const modalControl = (flag, id) => {
    if (flag === "MENU") {
      setModalFlag({ ...modalFlag, menu: !modalFlag.menu });
    } else if (flag === "REPLY") {
      setModalFlag({ ...modalFlag, reply: !modalFlag.reply });
    }
    setDataId(id); // 클릭된 대상의 wit id를 state에 저장
  };

  // 모달 내 다른 요소들을 클릭했을 때 닫히는 것을 방지하는 함수
  const onModalClose = (e) => {
    // console.log("못해먹겠어요");
    // if (e.target.className === e.currentTarget.className) {
    //   modalControl("MENU", dataId);
    // }
    // if (e.target.className === e.currentTarget.className) {
    //   console.log(e.target.className);
    //   console.log(e.currentTarget.className);
    //   modalControl("REPLY", dataId);
    // }
  };

  // 모달 외부를 클릭했을 때 닫히는 코드
  const onCloseControl = (e) => {
    console.log("모달외부클릭때문인가");
    // if (modalFlag.menu && !(e.target.className === e.currentTarget.className)) {
    //   modalControl("MENU", dataId);
    // }
    // if (
    //   modalFlag.reply &&
    //   !(e.target.className === e.currentTarget.className)
    // ) {
    //   modalControl("REPLY", dataId);
    // }
  };

  const dataList = {
    modalFlag,
    setModalFlag,
    dataId,
    setDataId,
    modalControl,
    onModalClose,
    onCloseControl,
  };
  return <AppContext.Provider value={dataList}>{children}</AppContext.Provider>;
}

export default ModalContextProvider;
