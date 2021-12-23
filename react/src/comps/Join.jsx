import React from 'react'
import "../css/Join.css"

function Join({goBackHome}) {


    return (
        <div className='joinLayout'>
        <div className="joinLayoutHeader">
            With Us My Wifriend!!
            <span className="xBox" onClick={goBackHome} >
              x
            </span>
          </div>
            <div className='joinForm'>
                <div><p>아이디</p>
                <input type="text" placeholder='아이디' /></div>
                <div><p>비밀번호</p>
                <input type="password" placeholder='비밀번호' /></div>
                <div><p>비밀번호확인</p>
                <input type="password" placeholder='비밀번호확인' /></div>
                <div><p>닉네임</p>
                <input type="text" placeholder='닉네임' /></div>
                <div><p>e-mail</p>
                <input type="text" placeholder='이메일을 넣을까말까' /></div>
                <button>Wit With Us</button>
            </div>
        </div>
    )
}

export default Join
