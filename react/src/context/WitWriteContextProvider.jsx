import React, { useContext } from "react";
import { createContext } from "react";
import { WitFetch, WitInsertFetch } from "../functions/WitFetch";
import { useWitContext } from "./WitContextProvider";

const AppContext = createContext();
export const useWitWriteContext = () => {
  return useContext(AppContext);
};

function WitWriteContextProvider({ children }) {
  const { wit, setWit, showWitList } = useWitContext();

  // wit 내용 입력했을 때
  const onChangeHandler = (e) => {
    const wit_text = e.target.value;
    setWit({ ...wit, text: wit_text });
  };

  // wit 입력 후 inputbox 클리어 함수
  const textReset = () => {
    setWit({ ...wit, text: "" });
  };

  // insert 함수
  const witInsert = async () => {
    //유효성검사
    if (wit.text === "") {
      window.alert("위트를 입력하세요");
      textRef.current.focus();
      return;
    } else {
      await WitInsertFetch(wit);
      textReset();
      await WitFetch();
      await showWitList();
    }
    console.table(wit);
  };

  // 글 입력시 overflow되면 textarea 부분 자동으로 높이 설정
  const textRef = React.createRef();
  const resize = () => {
    const obj = textRef.current;
    obj.style.height = "auto";
    obj.style.height = obj.scrollHeight + "px";
  };

  const dataList = { onChangeHandler, textReset, witInsert, textRef, resize };
  return <AppContext.Provider value={dataList}>{children}</AppContext.Provider>;
}

export default WitWriteContextProvider;
