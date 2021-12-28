import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AppContext = createContext();
export const useUserContext =() =>{
    return useContext(AppContext);
}

function UserContextProvider({ children }) {

    const [user, setUser] = useState({
        userId:"",
        password:"",
        userame:"",
        email:""
    });


    const dataList = {user, setUser}
    return <AppContext.Provider value={dataList}>{children}</AppContext.Provider>
}

export default UserContextProvider;