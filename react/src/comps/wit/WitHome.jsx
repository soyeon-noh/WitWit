import React from "react";

import "../../css/wit/WitHome.css";
import WitSearch from "./WitSearch";
import WitWrite from "./WitWrite";
import { Outlet } from "react-router-dom";
import { useModalContext } from "../../context/ModalContextProvider";
import { useState } from "react";

const WitHome = () => {
  const { modalFlag } = useModalContext();
  return (
    <>
      {modalFlag.reply ? (
        <section className="black_back up"></section>
      ) : (
        <section className="black_back"></section>
      )}
      <WitSearch />
      <WitWrite />
      <div className="witStyle">
        <Outlet />
      </div>
    </>
  );
};

export default WitHome;
