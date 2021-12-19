import React, { useCallback, useEffect } from "react";
import { useWitContext } from "../../context/WitContextProvider";

import "../../css/wit/WitHome.css";
import WitSearch from "./WitSearch";
import WitItem from "./WitItem";
import WitWrite from "./WitWrite";
import { WitFetch } from "../../functions/WitFetch";
import { Outlet } from "react-router-dom";

const WitHome = () => {
  const {showWitList, witList } = useWitContext();


  useEffect(showWitList, [showWitList]);
  return (
    <>
      <WitSearch />
      <WitWrite  />
      {/* <Outlet /> */}
      <div className="witStyle">
        <WitItem showWitList={showWitList} witList={witList}/>
      </div>
    </>
  );
};

export default WitHome;
