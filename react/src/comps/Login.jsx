import React from 'react'
import { useNavigate } from "react-router";
import "../css/Login.css"

import { useUserContext } from '../context/UserContextProvider'
import { LoginFetch } from '../functions/UserFetch';


function Login({goBackHome}) {

    const navigate = useNavigate();
    const {user,onChangeHandler} = useUserContext();

    const onLoginEventHandler = async() =>{
        const res = await LoginFetch(user)
        console.log("아 장난해요?",user)
        if(res.status === 404 ) {
            window.alert("404 극혐!!")
            return
        }
        if(res.status === 400) {
            window.alert("아이디를 확인해주세요")
            return
        } 
        if(res.status === 401 ) {
            window.alert("비밀번호를 확인해주세요")
            return
        }

        window.alert("로그인성공")
        navigate(`/`)
    }


    return (
        <div className='loginLayout'>
            <div className="loginLayoutHeader">
                With Us, My Wifriend!!
                <span className="xBox" onClick={goBackHome} >
                x
                </span>
            </div>
            <div className='loginForm'>
                <div><p>아이디</p>
                <input id="userId" type="text" onChange={onChangeHandler} placeholder='아이디' /></div>
                <div><p>비밀번호</p>
                <input id="password"type="password" onChange={onChangeHandler} placeholder='비밀번호' /></div>
                <div><button onClick={onLoginEventHandler}>Wit With Us</button></div>
            </div>
        </div>
    )
}

export default Login
