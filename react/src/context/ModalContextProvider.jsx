import React, { createContext } from 'react'
import { useState } from 'react';
import { useContext } from 'react';

const AppContext = createContext();
export const useModalContext = () =>{
    return useContext(AppContext)
}

function ModalContextProvider({children}) {
    
  // open plag
  const [modalOpen, setModalOpen] = useState(false);

  // 클릭대상 id 저장하는 state
  const [dataId, setDataId] = useState("");


  // 모달창 열고 닫기 콘트롤
  const modalControl = (id) => {
    setModalOpen(!modalOpen);
    setDataId(id); // 클릭된 대상의 wit id를 state에 저장
  };

  // 모달 내 다른 요소들을 클릭했을 때 닫히는 것을 방지하는 함수
  const onModalClose = (e) => {
    if (e.target === e.currentTarget) {
      modalControl();
    }
  };

  // 모달 외부를 클릭했을 때 닫히는 코드
  const onCloseControl = (e) => {
    if(modalOpen && !(e.target === e.currentTarget)) {
        modalControl();
    }
  }



    const dataList = {
        modalOpen, setModalOpen,
        dataId, setDataId,
        modalControl, onModalClose,
        onCloseControl
    
    };
    return <AppContext.Provider value={dataList}>{children}</AppContext.Provider>
}


export default ModalContextProvider
