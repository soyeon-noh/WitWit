import React, { useRef, useState } from "react";

import { styled } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";

import { WitSearchFetch } from "../../functions/WitFetch";
import { useWitContext } from "../../context/WitContextProvider";

function WitSearch() {

  const MyIcon = styled(SearchIcon)({ color: "#ccc", });

  const {setWitList} = useWitContext();

  // 검색어 setting
  const [keyword, setKeyword] = useState([]);
  const searchBar = useRef();

  // search 입력값 받아오기
  const onSearchChange = (e) => {
    const insertKeyword = e.target.value;
    setKeyword(insertKeyword);
  };

  // 검색어 입력 후 searchBar 클리어
  const searchReset = () => {
    setKeyword("");
  };

  // 검색어 서버에 보내고 받기
  const witSearch = async () => {
    if (keyword == "") {
      searchBar.current.focus();
      return;
    } else {
      const json = await WitSearchFetch(keyword);
      console.log(json)
      await setWitList(json);
      searchReset();
    }
  };

  // Enter Press했을 때 나타나는 event
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
          value={keyword}
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
