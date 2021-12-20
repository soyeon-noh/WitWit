import React from "react";
import WitItemContain from "./WitItemContain";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";

function WitQuote({ propsList, wit, createAt, createAtO }) {
  return (
    <>
      <div className="quoteBox">
        <WitItemContain
          propsList={propsList}
          wit={wit.originalWit[0]}
          createAt={createAtO}
        ></WitItemContain>
      </div>
      <div>
        <KeyboardCapslockIcon />
      </div>
      <WitItemContain
        propsList={propsList}
        wit={wit}
        createAt={createAt}
      ></WitItemContain>
    </>
  );
}

export default WitQuote;
