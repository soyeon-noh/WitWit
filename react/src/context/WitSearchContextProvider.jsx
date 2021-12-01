import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useWitSearchContext = () => {
  return useContext(AppContext);
};

function WitSearchContextProvider({ children }) {
  const [searchInsert, setSearchInsert] = useState([]);
  const onSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchInsert(keyword);
  };

  const witSearch = async () => {};

  const searchData = [searchInsert, setSearchInsert, onSearchChange];

  return (
    <AppContext.Provider value={searchInsert}>{children}</AppContext.Provider>
  );
}

export default WitSearchContextProvider;
