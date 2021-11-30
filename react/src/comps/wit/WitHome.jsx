import React from 'react'
import WitContextProvider from '../../context/WitContextProvider'

import WitItem from './WitItem'
import WitWrite from './WitWrite'

import "../../css/WitHome.css"
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

function WitHome() {

    return (
        <>
            <WitContextProvider>
            {/* <input className="searchBar"placeholder="wit를 검색하세요"/> */}
            <TextField 
                className="searchBar"
                InputProps={{
                startAdornment: (
                    <SearchIcon position="start">
                    </SearchIcon>
                )
                }}
                variant="standard"
             />
                <WitWrite/>
                <WitItem/>
            </WitContextProvider>
        </>
    )
}

export default WitHome