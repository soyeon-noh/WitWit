import React from 'react'
import WitContextProvider from '../../context/WitContextProvider'

import WitItem from './WitItem'
import WitWrite from './WitWrite'

import "../../css/WitHome.css"
import logo2 from "../../static/img/logo2.svg";


function WitHome() {
    


    return (
        <>
            {/* 비로그인시 상단에 로고 노출 */}
            {/* <img src={logo2} className="home_logo" /> */}

            {/* 로그인 한 경우에는 인풋박스 노출 */}
                
            <WitContextProvider>
                <WitWrite/>
                <WitItem/>
            </WitContextProvider>
        </>
    )
}

export default WitHome