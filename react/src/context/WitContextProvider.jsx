import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import moment from "moment";


const AppContext = createContext();
export const useWitContext = () =>{
    return useContext(AppContext);
} 

function WitContextProvider({children}) {
    
    // const [wit, setWit] = useState({
    //     id: "",  // 위트 아이디
    //     text: "", // 위트 텍스트 (512자 제한)
    //     createdAt: "",// 위트 생성 날짜
    //     userId: "", // 작성자 ID
    //     userName: "", // 작성자 이름
    //     profileUrl: "", // 작성자 프로필 이미지링크

    //     folder_id: "", // 폴더 seq (외래키)
    //     image_id: "" // 이미지 seq (외래키)
    // })

    const [wit, setWit] = useState({
        id: "witID",  // 위트 아이디
        text: "WitWit", // 위트 텍스트 (512자 제한)
        createdAt: "2021-11-22 00:22:44",// 위트 생성 날짜
        userId: "userID", // 작성자 ID
        userName: "userNick", // 작성자 이름
        profileUrl: "none", // 작성자 프로필 이미지링크

        folder_id: "none", // 폴더 seq (외래키)
        image_id: "none" // 이미지 seq (외래키)
    })

    const [witList, setWitList] = useState([wit, wit, wit, wit]);

    const witFetch = useCallback(async()=>{
        const res = await fetch("http://localhost:5050/");
        const list = await res.json();

        await setWitList(list);
    },[]);
    useEffect(witFetch, [witFetch]);

    // wit 내용 입력했을 때
    const onChaneHandler =(e) =>{
        const wit_text = e.target.value;
        setWit({...wit, text:wit_text})
    }


    const providerData = {wit, setWit, witList, setWitList, onChaneHandler}
    
    return (
        <AppContext.Provider value = {providerData}>
            {children}
        </AppContext.Provider>
    )
}

export default WitContextProvider
