import React, { useEffect, useRef, useState } from "react";
import "../../css/myroom/FolderInsert.css";
import FolderInsertModal from "./FolderInsertModal";

function FolderInsert({ folderFetch }) {
  // modal창 open plag
  const [modalOpen, setModalOpen] = useState(false);

  //modal창 닫기 함수
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="windowUnder">
        <div className="folderInsert" onClick={modalClose}>
          ADD
        </div>
        {modalOpen && (
          <FolderInsertModal
            modalClose={modalClose}
            folderFetch={folderFetch}
          ></FolderInsertModal>
        )}
      </div>
    </>
  );
}

export default FolderInsert;
