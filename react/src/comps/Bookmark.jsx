import React from "react";
import "../css/Bookmark.css";
import { NavLink } from "react-router-dom";

const user_id = "@userID";

function Bookmark() {
  return (
    <div className="btn_bookmark_box">
      <NavLink className="btn_bookmark home" to="/" activeClassName="active">
        HOME
      </NavLink>
      <NavLink
        className="btn_bookmark myroom"
        to={user_id}
        activeClassName="active"
      >
        MYROOM
      </NavLink>
      <NavLink
        className="btn_bookmark login"
        to="/login"
        activeClassName="active"
      >
        LOGIN
      </NavLink>
      <NavLink
        className="btn_bookmark join"
        to="/signup"
        activeClassName="active"
      >
        JOIN
      </NavLink>
    </div>
  );
}

export default Bookmark;
