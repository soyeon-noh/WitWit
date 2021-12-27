import React from "react";
import { useWitContext } from "../../context/WitContextProvider";
import WitItem from "./WitItem";

function WitLayout() {
  const { showWitList, witList } = useWitContext();
  
  return (
      <WitItem showWitList={showWitList} witList={witList} />
  );
}

export default WitLayout;
