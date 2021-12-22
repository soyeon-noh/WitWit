import React from "react";
import { useWitContext } from "../../context/WitContextProvider";
import WitItem from "./WitItem";

function WitLayout() {
  const { showWitList, witList } = useWitContext();
  
  return (
    <div className="witStyle">
      <WitItem showWitList={showWitList} witList={witList} />
    </div>
  );
}

export default WitLayout;
