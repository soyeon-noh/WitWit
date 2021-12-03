import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useWitSearchContext = () => {
  return useContext(AppContext);
};

function WitSearchContextProvider({ children }) {
  const [keyword, setKeyword] = useState([]);

  const onSearchChange = (e) => {
    const insertKeyword = e.target.value;
    setKeyword(insertKeyword);
  };

  const searchData = [keyword, setKeyword, onSearchChange];

  return (
    <AppContext.Provider value={searchData}>{children}</AppContext.Provider>
  );
}

export default WitSearchContextProvider;
