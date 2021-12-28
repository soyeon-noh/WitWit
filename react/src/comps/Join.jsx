import React, { useRef } from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router";
import { useUserContext } from '../context/UserContextProvider';
import "../css/Join.css"
import { JoginFetch } from '../functions/UserFetch';

function Join({goBackHome}) {

  const navigate = useNavigate();
  const {user,onChangeHandler} = useUserContext();

  const [passCheck, setPassCheck] = useState(false);

  const refId = useRef();
  const refPw = useRef();
  const refRePw = useRef();
  const refName = useRef();
  const refMail = useRef();
  

  const incorrect = { color : "red", fontSize : "small", marginLeft : "8px", }
  const correct = { color : "blue", fontSize : "small",  marginLeft : "8px", }

  const passwordCheck = (e) =>{
    const rePass = e.target.value
    if(user.password === rePass) setPassCheck(true)
    else  setPassCheck(false)
  }

  const onJoinChange = async () =>{
    
    if(user.userId === "") { refId.current.focus(); return }
    if(user.password === "") { refPw.current.focus(); return }
    if(user.userName === "") { refName.current.focus(); return }
    if(user.email === "") { refMail.current.focus(); return }
    if(!passCheck){ refRePw.current.focus(); return }

    const res = await JoginFetch(user)
    window.alert("회원가입성공")
    navigate(`/login`)
  }


    return (
        <div className='joinLayout'>
        <div className="joinLayoutHeader">
            With Us My Wifriend!!
            <span className="xBox" onClick={goBackHome} >
              x
            </span>
          </div>
            <div className='joinForm'>
                <div>
                  <p>아이디</p>
                  <input ref={refId} id="userId" onChange={onChangeHandler} type="text" placeholder='아이디' />
                  {user.userId ===""
                    ? <span style={incorrect}>ID를 입력하세요</span>
                    : <></>}
                </div>
                
                <div>
                  <p>비밀번호</p>
                  <input ref={refPw} id="password" onChange={onChangeHandler} type="password" placeholder='비밀번호' />
                  {user.password ===""
                    ? <span style={incorrect}>비밀번호를 입력하세요</span>
                    : <></>}
                </div>
                
                <div>
                  <p>비밀번호확인</p>
                  <input ref={refRePw} id="repassword" onChange={passwordCheck} type="password" placeholder='비밀번호확인' />
                  { passCheck  
                    ? <span style={correct}>비밀번호가 일치합니다</span>
                    : <span style={incorrect}>비밀번호가 일치하지 않습니다</span>  }
                </div>

                <div>
                  <p>닉네임</p>
                  <input ref={refName} id="userName" onChange={onChangeHandler} type="text" placeholder='닉네임' />
                  {user.userName ===""
                    ? <span style={incorrect}>닉네임을 입력하세요</span>
                    : <></>}
                </div>

                <div>
                  <p>e-mail</p>
                  <input ref={refMail} id="email" onChange={onChangeHandler} type="text" placeholder='이메일을 넣을까말까' />
                  {user.email ===""
                    ? <span style={incorrect}>e-mail을 입력하세요</span>
                    : <></>}
                </div>
                
                <button onClick={onJoinChange}>Wit With Us</button>
            </div>
        </div>
    )
}

export default Join
