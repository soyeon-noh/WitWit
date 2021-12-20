import React, { useEffect } from "react";
import { useWitContext } from "../../context/WitContextProvider";

import "../../css/wit/WitHome.css";
import WitSearch from "./WitSearch";
import WitWrite from "./WitWrite";
import { Outlet } from "react-router-dom";
import { useModalContext } from "../../context/ModalContextProvider";

const WitHome = () => {
  const { showWitList } = useWitContext();
  const { modalFlag } = useModalContext();

  useEffect(showWitList, [showWitList]);
  return (
    <>
      {modalFlag.reply ? (
        <section className="black_back up"></section>
      ) : (
        <section className="black_back"></section>
      )}
      <WitSearch />
      <WitWrite />
      <Outlet />
    </>
  );
};

export default WitHome;
