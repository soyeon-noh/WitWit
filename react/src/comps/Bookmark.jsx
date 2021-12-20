import React from "react";
import "../css/Bookmark.css";
import { NavLink } from "react-router-dom";

const user_id = "@c_a_y";

function Bookmark() {
  return (
    <div className="btn_bookmark_box">
      <NavLink className="btn_bookmark home" to="/" activeClassName="active">
        HOME
      </NavLink>
      <NavLink className="btn_bookmark myroom" to={user_id}>
        MYROOM
      </NavLink>
      <NavLink className="btn_bookmark login" to="/login">
        LOGIN
      </NavLink>
      <NavLink className="btn_bookmark join" to="/signup">
        JOIN
      </NavLink>
    </div>
  );
}

export default Bookmark;
