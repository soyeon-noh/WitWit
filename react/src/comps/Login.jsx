import React from 'react'
import "../css/Login.css"

function Login({goBackHome}) {
    return (
        <div className='loginLayout'>
            <div className="loginLayoutHeader">
                With Us My Wifriend!!
                <span className="xBox" onClick={goBackHome} >
                x
                </span>
            </div>
            <div className='loginForm'>
                <div><p>아이디</p>
                <input type="text" placeholder='아이디' /></div>
                <div><p>비밀번호</p>
                <input type="password" placeholder='비밀번호' /></div>
                <div><button>Wit With Us</button></div>
            </div>
        </div>
    )
}

export default Login
