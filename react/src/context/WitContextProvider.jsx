import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import moment from "moment";
import "moment/locale/ko";

const AppContext = createContext();
export const useWitContext = () => {
  return useContext(AppContext);
};

export const User_id = "@c_a_y";

function WitContextProvider({ children }) {
  const [wit, setWit] = useState({
    id: "", // 위트 아이디
    text: "", // 위트 텍스트 (150자 제한)
    createdDate: moment().format("YYYY-MM-DD"), // 위트 생성 날짜
    createdTime: moment().format("HH:mm:ss"), // 위트 생성 시간
    userId: "@c_a_y", // 작성자 ID
    userName: "ay", // 작성자 이름
    profileUrl: "", // 작성자 프로필 이미지링크

    folder_id: "", // 폴더 seq (외래키)
    image_id: "", // 이미지 seq (외래키)
    parentWit: null,
    originalWit: null,
    replyArray: null,

    likeyCount: null,
    // replys: "$replyArray",
    replyCount: null,
  });

  const [witList, setWitList] = useState([]);
  const providerData = {
    wit,
    setWit,
    witList,
    setWitList,
  };

  return (
    <AppContext.Provider value={providerData}>{children}</AppContext.Provider>
  );
}

export default WitContextProvider;
