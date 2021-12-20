import React from "react";
import { useNavigate } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";
import { useWitWriteContext } from "../../context/WitWriteContextProvider";
import ImageIcon from "@mui/icons-material/Image";

import "../../css/wit/WitWrite.css";

const WitWrite = () => {
  const navigate = useNavigate();
  const { wit } = useWitContext();
  const { onChangeHandler, witInsert, textRef, resize } = useWitWriteContext();

  return (
    <div>
      <form className="wit_input_box" enctype="multipart/form-data">
        <div className="divBox">
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

        <div className="etcBox">
          <span className="insertImg">
            <ImageIcon />
            이미지 추가하기
          </span>
        </div>
      </form>
    </div>
  );
};

export default WitWrite;
