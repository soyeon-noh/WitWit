import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useWitContext } from "../../context/WitContextProvider";
import { useWitWriteContext } from "../../context/WitWriteContextProvider";
import ImageIcon from "@mui/icons-material/Image";

import "../../css/wit/WitWrite.css";

const WitWrite = () => {
  const navigate = useNavigate();
  const { wit } = useWitContext();
  const { onChangeHandler, witInsert, textRef, resize } = useWitWriteContext();

  // 이미지 미리보기를 위해 받을  state
  const [imgBase, setImgBase] = useState([]);
  //이미지 파일 그 자체를 받을 state
  const [imgFile, setImgFile] = useState(null);

  const fileRef = useRef();
  const fileUp = () => {
    fileRef.current.click();
  };

  const onChangeIMGFile = (e) => {
    setImgFile(e.target.files);

    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]); // 파일을 버퍼에 저장

        reader.onloadend = () => {
          const iBase = reader.result;
          if (iBase) {
            var baseSub = iBase.toString();
            setImgBase((imgBase) => [...imgBase, baseSub]);
          }
        };
      }
    }
  };

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
          <button onClick={() => witInsert({ imgFile })}>위트하기</button>
        </div>

        <div className="etcBox">
          <div className="imgPreview">
            {imgBase &&
              imgBase.map((f) => {
                return <img src={f} />;
              })}
          </div>
          <span className="insertImg">
            <ImageIcon onClick={fileUp} />
            <input
              type="file"
              id="imgFile"
              name="imgFile"
              multiple
              style={{ display: "none" }}
              ref={fileRef}
              onChange={onChangeIMGFile}
            />
          </span>
        </div>
      </form>
    </div>
  );
};

export default WitWrite;
