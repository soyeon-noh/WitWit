import React, { useCallback, useEffect } from "react";
import {
  useWitContext,
} from "../../context/WitContextProvider";

import "../../css/wit/WitHome.css";
import WitSearch from "./WitSearch";
import WitItem from "./WitItem";
import WitWrite from "./WitWrite";
import { WitFetch } from "../../functions/WitFetch";

const WitHome = () => {
  const { setWitList, witList } = useWitContext();

  // wit list 불러오기
  const showWitList = useCallback(async () => {
    const list = await WitFetch()
    await setWitList(list);
  }, []);
  useEffect(showWitList, [showWitList]);

  return (
    <>
      <WitSearch setWitList={setWitList} />
      <WitWrite showWitList={showWitList}/>
      <div className="witStyle">
      <WitItem showWitList={showWitList} witList={witList}/>
      </div>
    </>
  );
};

export default WitHome;
