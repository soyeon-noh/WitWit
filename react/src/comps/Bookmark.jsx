import React from 'react'
import "../css/Bookmark.css"
import { BrowserRouter, NavLink } from "react-router-dom";


function Bookmark() {
    return (
            <div className="btn_bookmark_box">
{/* 
                <div className="btn_bookmark home" >
                    <NavLink exact to="/" activeClassName="active_mark">HOME</NavLink></div>
                <div className="btn_bookmark login">
                    <NavLink exact to="/user/login" activeClassName="active_mark">LOGIN</NavLink></div>
                <div className="btn_bookmark join">
                    <NavLink exact to="/user/join" activeClassName="active_mark">JOIN</NavLink></div> */}

                <NavLink className="btn_bookmark home" to="/" activeClassName="active">HOME</NavLink>
                <NavLink className="btn_bookmark login" to="/login" activeClassName="active">LOGIN</NavLink>
                <NavLink className="btn_bookmark join" to="/signup" activeClassName="active">JOIN</NavLink>

          </div>
    );
}

export default Bookmark;