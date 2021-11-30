import React from 'react'
import "../css/BoardBox.css"

import { Route, Routes } from "react-router-dom"
import WitHome from './wit/WitHome'
import MyRoom from './room/MyRoom'
import Login from './Login'
import Join from './Join'

function BoardBox() {
    return (
    <section className="board_box">
        
        
        <section className="board">
            <Routes>
                <Route path="" element={<WitHome/>}  />
                <Route path="/:userid" element={<MyRoom/>}  />
                <Route extract path="/login" element={<Login/>} />
                <Route extract path="/signup" element={<Join/>} />
            </Routes>
        </section>
        
  </section>

    )
}

export default BoardBox
