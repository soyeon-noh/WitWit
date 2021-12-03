import React, { useCallback, useEffect } from "react";
import { useWitContext } from "../../context/WitContextProvider";
import "../../css/WitWrite.css";

const WitWrite = () => {
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
    const fetch_option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wit),
    };

    // 입력시 화면에 바로 출력가능하도록
    await fetch("http://localhost:5050/", fetch_option);
    textReset();
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
