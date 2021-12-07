import React, { useCallback, useEffect } from "react";
import WitContextProvider, {
  useWitContext,
} from "../../context/WitContextProvider";

import "../../css/wit/WitHome.css";
import WitSearch from "./WitSearch";
import WitItem from "./WitItem";
import WitWrite from "./WitWrite";

const WitHome = () => {
  const { setWitList } = useWitContext();

  // wit list 불러오기
  const witFetch = useCallback(async () => {
    const res = await fetch("http://localhost:5050/");
    const list = await res.json();
    await setWitList(list);
  }, []);

  useEffect(witFetch, [witFetch]);

  return (
    <>
      <WitSearch witFetch={witFetch} setWitList={setWitList} />
      <WitWrite witFetch={witFetch} />
      <WitItem witFetch={witFetch} />
    </>
  );
};

export default WitHome;
