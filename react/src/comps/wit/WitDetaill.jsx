import React from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useWitContext } from "../../context/WitContextProvider";
import { WitIdSearchFetch } from "../../functions/WitFetch";
import WitItem from "./WitItem";

function WitDetaill() {
  const {wit_id} = useParams();
  const user_id = "@c_a_y";
  const { witList, setWitList, } = useWitContext();

  const showWitList = useCallback(async () => {
    const res = await WitIdSearchFetch(user_id, wit_id);
    await setWitList(res);
  }, []);

  return (
    <>
      {witList && <WitItem witList={witList} showWitList={showWitList} />}
    </>
  );

}

export default WitDetaill;
