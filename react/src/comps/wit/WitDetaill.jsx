import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWitContext } from "../../context/WitContextProvider";
import { WitIdSearchFetch } from "../../functions/WitFetch";
import WitItem from "./WitItem";

function WitDetaill() {
  const wit_id = useParams("wit_id");
  const user_id = "@c_a_y";
  const { witList, setWitList, showWitList } = useWitContext();

  const wit = useCallback(async () => {
    const res = await WitIdSearchFetch(user_id, wit_id);
    console.table("안나오나", res);
    await setWitList(res);
  }, []);
  useEffect(wit, [wit]);

  return (
    <>{witList && <WitItem witList={witList} setWitList={showWitList} />}</>
  );
}

export default WitDetaill;
