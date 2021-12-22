import React, { createContext, useContext, useState } from "react";

import "moment/locale/ko";
import { useCallback } from "react";
import { WitFetch } from "../functions/WitFetch";

const AppContext = createContext();
export const useWitContext = () => {
  return useContext(AppContext);
};

export const User_id = "@c_a_y";

function WitContextProvider({ children }) {
  const [wit, setWit] = useState({
    id: "", // 위트 아이디
    text: "", // 위트 텍스트 (150자 제한)
    createdDate: "", // 위트 생성 날짜
    createdTime: "", // 위트 생성 시간
    userId: "@c_a_y", // 작성자 ID
    userName: "ay", // 작성자 이름
    profileUrl: "", // 작성자 프로필 이미지링크

    parentWit: "", // 이전 위트 id값
    originalWit: "", // 인용,리마크당한 오리지널위트 id값

    folder_id: "", // 폴더 seq (외래키)
    parentWit: null,
    originalWit: null,
    replyArray: null,

    likeyCount: null,
    // replys: "$replyArray",
    replyCount: null,
  });

  const [witList, setWitList] = useState([]);


  // wit list 불러오기
  const showWitList = useCallback(async () => {
    const list = await WitFetch();
    // console.table(list)
    await setWitList(list);
  }, []);


  const providerData = {
    wit,
    setWit,
    witList,
    setWitList,
    showWitList,
  };

  return (
    <AppContext.Provider value={providerData}>{children}</AppContext.Provider>
  );
}

export default WitContextProvider;
