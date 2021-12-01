import React, { useContext, useRef, useState } from "react";
import WitContextProvider, {
  useWitContext,
} from "../../context/WitContextProvider";

import WitItem from "./WitItem";
import WitWrite from "./WitWrite";

import "../../css/WitHome.css";
import { styled } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";

const MyIcon = styled(SearchIcon)({
  color: "#ccc",
});

function WitHome() {
  return (
    <>
      <WitContextProvider>
        <span className="searchBox">
          <MyIcon fontSize="1rem" />
          <input className="searchBar" placeholder="wit를 검색하세요" />
        </span>

        <WitWrite />
        <WitItem />
      </WitContextProvider>
    </>
  );
}

export default WitHome;
