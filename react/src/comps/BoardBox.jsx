import React from 'react'
import "../css/BoardBox.css"
import { Bookmark } from '.'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import WitHome from './WitHome'
import Login from './Login'
import Join from './Join'
import MyRoom from './MyRoom'



function BoardBox() {
    return (
    <section className="board_box">
        
        <section className="board">
            <Routes>
                <Route path="" element={<WitHome/>}  />
                <Route extract path="/login" element={<Login/>} />
                <Route extract path="/signup" element={<Join/>} />
                <Route extract path="/myroom" element={<MyRoom/>} />
            </Routes>
        </section>
        
  </section>

    )
}

export default BoardBox
