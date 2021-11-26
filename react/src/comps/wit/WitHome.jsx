import React from 'react'
import WitContextProvider from '../../context/WitContextProvider'

import WitItem from './WitItem'
import WitWrite from './WitWrite'

import "../../css/WitHome.css"

function WitHome() {

    return (
        <>
            <WitContextProvider>
                <WitWrite/>
                <WitItem/>
            </WitContextProvider>
        </>
    )
}

export default WitHome