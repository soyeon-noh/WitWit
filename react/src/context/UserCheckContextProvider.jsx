import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { UserCheck } from "../functions/UserFetch";

const AppContext = createContext();
export const useUserCheckContext =() =>{
    return useContext(AppContext);
}

function UserCheckContextProvider({ children }) {

    const [userC, setUserC] = useState({
        userId:"",
        password:"",
        userName:"",
        email:""
    });
    
    const userCheck = async () =>{
        const res = await UserCheck();
        setUserC(res)
    }

    const dataList = {userC,userCheck}
    return <AppContext.Provider value={dataList}>{children}</AppContext.Provider>
}

export default UserCheckContextProvider;