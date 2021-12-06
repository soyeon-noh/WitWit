import React, { useCallback, useEffect } from "react";
import WitContextProvider from "../../context/WitContextProvider";

import WitItem from "./WitItem";
import WitWrite from "./WitWrite";

import "../../css/wit/WitHome.css";
import WitSearch from "./WitSearch";

function WitHome() {
  return (
    <>
      <WitContextProvider>
        <WitSearch />
        <WitWrite />
        <WitItem />
      </WitContextProvider>
    </>
  );
}

export default WitHome;
