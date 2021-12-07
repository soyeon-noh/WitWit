import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/wit/WitItemMenu.css";

function WitItemMenu({ data_id, witMenuClose, witFetch }) {
  const navigate = useNavigate();

  const onWitMenuClose = (e) => {
    if (e.target === e.currentTarget) {
      console.log(e.target);
      console.log(e.currentTarget);
      witMenuClose();
    }
  };

  const witDelete = async (e) => {
    const fetch_option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    };
    const id = data_id;
    const user_id = "@userID";

    if (window.confirm("삭제하시겠습니까?")) {
      await fetch(`http://localhost:5050/${user_id}/${id}`, fetch_option);
      witFetch();
    }
  };

  return (
    <div className="witmenu" id={data_id} onClick={onWitMenuClose}>
      <p onClick={witDelete}>삭제하기</p>
      <p>폴더담기</p>
    </div>
  );
}

export default WitItemMenu;
