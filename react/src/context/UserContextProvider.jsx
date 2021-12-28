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
        userName:"",
        email:""
    });
    
    const onChangeHandler = (e) => {
        const name = e.target.id
        setUser({...user, [name] : e.target.value})
    }
    



    const dataList = {user, setUser,onChangeHandler}
    return <AppContext.Provider value={dataList}>{children}</AppContext.Provider>
}

export default UserContextProvider;