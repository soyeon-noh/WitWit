import React from "react";
import "../css/Bookmark.css";
import { NavLink } from "react-router-dom";
import { useUserCheckContext } from "../context/UserCheckContextProvider";

const user_id = "@c_a_y";

function Bookmark() {

  const {userC} = useUserCheckContext();

  return (
    <div className="btn_bookmark_box">
      <NavLink className="btn_bookmark home" to="/" activeClassName="active">
        HOME
      </NavLink>
      <NavLink className="btn_bookmark myroom" to={user_id}>
        MYROOM
      </NavLink>
      {userC ?
      <NavLink className="btn_bookmark logout" to="/logout">
        Logout
      </NavLink>
      : <>
          <NavLink className="btn_bookmark login" to="/login">
            LOGIN
          </NavLink>
          <NavLink className="btn_bookmark join" to="/signup">
            JOIN
          </NavLink>
        </> 
      }
    </div>
  );
}

export default Bookmark;
