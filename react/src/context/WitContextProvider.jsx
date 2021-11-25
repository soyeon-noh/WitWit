import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AppContext = createContext();
export const useWitContext = () =>{
    return useContext(AppContext);
} 

function WitContextProvider({children}) {
    
    // const [wit, setWit] = useState({
    //     id: "witSEQ",  // 위트 아이디
    //     text: "Wit,내용", // 위트 텍스트 (512자 제한)
    //     createdAt: "2021-11-22 11:22:22", // 위트 생성 날짜
    //     userId: "작성자 ID", // 작성자 ID
    //     userName: "작성자 이름", // 작성자 이름
    //     profileUrl: "작성자 프로필 이미지링크", // 작성자 프로필 이미지링크

    //     folder_id: "폴더 seq", // 폴더 seq (외래키)
    //     image_id: "이미지 seq" // 이미지 seq (외래키)
    // })

    // const [witList, setWitList] = useState([wit,wit,wit]);

    const [witList, setWitList] = useState([]);

    const witFetch = useCallback(async()=>{
        const res = await fetch("http://localhost:5050/");
        const list = await res.json();

        await setWitList(list);
    },[]);
    useEffect(witFetch, [witFetch]);

    const providerData = {witList, setWitList}
    
    
    return (
        <AppContext.Provider value = {providerData}>
            {children}
        </AppContext.Provider>
    )
}

export default WitContextProvider
