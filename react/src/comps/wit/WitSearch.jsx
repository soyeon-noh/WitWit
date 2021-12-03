import React, { useRef, useState } from "react";

import { styled } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useWitContext } from "../../context/WitContextProvider";

function WitSearch() {
  const { setWitList } = useWitContext();
  const MyIcon = styled(SearchIcon)({
    color: "#ccc",
  });

  const [keyword, setKeyword] = useState([]);
  const searchBar = useRef();

  const onSearchChange = (e) => {
    const insertKeyword = e.target.value;
    setKeyword(insertKeyword);
  };

  const witSearch = async () => {
    console.log(keyword);
    if (keyword == "") {
      window.alert("검색어를 입력하세요");
      searchBar.current.focus();
      return;
    } else {
      const result = await fetch(`http://localhost:5050/search?q=${keyword}`);
      const json = await result.json();
      console.table(json);
      setWitList(json);
    }
  };

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      witSearch();
    }
  };

  return (
    <>
      <span className="searchBox">
        <MyIcon fontSize="1rem" />
        <input
          ref={searchBar}
          className="searchBar"
          placeholder="wit를 검색하세요"
          onChange={onSearchChange}
          onKeyPress={onKeyPressHandler}
        />
      </span>
    </>
  );
}

export default WitSearch;
