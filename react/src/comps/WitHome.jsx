import React from 'react'
import WitContextProvider from '../context/WitContextProvider'
import WitItem from './WitItem'


function WitHome() {


    return (
        <>
            <WitContextProvider>
                <WitItem/>
            </WitContextProvider>
        </>
    )
}

export default WitHome