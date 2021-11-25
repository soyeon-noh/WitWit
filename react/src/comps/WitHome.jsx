import React from 'react'
import WitContextProvider from '../context/WitContextProvider'
import WitItem from './WitItem'

import "../css/WitHome.css"
import logo2 from "../static/img/logo2.svg";


function WitHome() {


    return (
        <>
        <img src={logo2} className="home_logo" />
            <WitContextProvider>
                <WitItem/>
            </WitContextProvider>
        </>
    )
}

export default WitHome