import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";
import "../../css/wit/WitWrite.css";
import { WitFetch, WitInsertFetch } from "../../functions/WitFetch";

const WitWrite = ({ showWitList }) => {
  const navigate = useNavigate();
  const { wit, setWit } = useWitContext();

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
  };

  // 글 입력시 overflow되면 textarea 부분 자동으로 높이 설정
  const textRef = React.createRef();
  const resize = () => {
    const obj = textRef.current;
    obj.style.height = "auto";
    obj.style.height = obj.scrollHeight + "px";
  };

  return (
    <div>
      <div className="wit_input_box">
        <textarea
          type="text"
          maxLength="150"
          value={wit.text}
          onChange={onChangeHandler}
          ref={textRef}
          onKeyDown={resize}
          onKeyUp={resize}
          className="write"
          placeholder="당신의 생각을 wit하세요"
        />
        <button onClick={witInsert}>위트하기</button>
      </div>
    </div>
  );
};

export default WitWrite;
