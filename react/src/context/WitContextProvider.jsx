import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'


import moment from "moment";
import "moment/locale/ko";

const AppContext = createContext();
export const useWitContext = () =>{
    return useContext(AppContext);
} 

function WitContextProvider({children}) {
    
    const [wit, setWit] = useState({
        id: "witID",  // 위트 아이디
        text: "", // 위트 텍스트 (150자 제한)
        createdDate: moment().format("YYYY-MM-DD"), // 위트 생성 날짜
        createdTime: moment().format("HH:mm:ss"), // 위트 생성 시간
        userId: "userID", // 작성자 ID
        userName: "userNick", // 작성자 이름
        profileUrl: "none", // 작성자 프로필 이미지링크

        folder_id: "none", // 폴더 seq (외래키)
        image_id: "none" // 이미지 seq (외래키)
    })

    const [witList, setWitList] = useState([]);

    const witFetch = useCallback(async()=>{
        const res = await fetch("http://localhost:5050/");
        const list = await res.json();

        await setWitList(list);
    },[]);
    useEffect(witFetch, [witFetch]);

    const providerData = {wit, setWit, witList, setWitList, witFetch}
   
    
    return (
        <AppContext.Provider value = {providerData}>
            {children}
        </AppContext.Provider>
    )
}

export default WitContextProvider
