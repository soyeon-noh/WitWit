import React, { useEffect, useRef,  } from "react";
import { useWitContext } from "../../context/WitContextProvider";
import { useWitWriteContext } from "../../context/WitWriteContextProvider";
import ImageIcon from "@mui/icons-material/Image";

import "../../css/wit/WitWrite.css";
import { useUserCheckContext } from "../../context/UserCheckContextProvider";
import { useUserContext } from "../../context/UserContextProvider";

const WitWrite = () => {
  
  const { wit } = useWitContext();
  const { onChangeHandler, witInsert, textRef, resize,
    imgBase, setImgBase, setImgFile } = useWitWriteContext();

    const {userC} = useUserCheckContext();

    // useEffect(userC, [userC]);

  //아이콘 클릭하면 파일첨부하기 창이 뜨도록
  const fileRef = useRef();
  const fileUp = () => {
    fileRef.current.click();
  };


  //파일 첨부시 첨부된 파일 set하기
  const onChangeIMGFile = (e) => {
    setImgFile(e.target.files);

    // 이미지 첨부시 미리보기 화면에 볼 수 있도록 set하기
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
      <div className="wit_input_box">
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
          <button onClick={() => witInsert()}>위트하기</button>
        </div>

        <div className="etcBox">
          <div className="imgPreview">
            {imgBase &&
              imgBase.map((f) => {
                return <img src={f} />;
              })}
          </div>
          <span className="insertImg">
            <ImageIcon onClick={fileUp} fontSize="" />
            <input
              type="file"
              id="file"
              name="file"
              multiple="multiple"
              style={{ display: "none" }}
              ref={fileRef}
              onChange={onChangeIMGFile}
            />
          </span>
        </div>
      </div>

    </div>
  );
};

export default WitWrite;
