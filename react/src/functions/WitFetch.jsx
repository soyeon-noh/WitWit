const fetchPostOption = (list) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  };
};

// wit List 호출하는 Fetch
// 수정 필요 로그인에 따라 다르게
export const WitFetch = async () => {
  const res = await fetch("/wit");
  const list = res.json();
  return list;
};

/** 이거 아래 두개 필요없나? 이미 기능이 구현되어 있는데 어디서 어떻게 한 건지 모르겠다. */
// 로그인한 유저의 wit List 호출하는 Fetch
export const WitLoginUserFetch = async () => {
  const res = await fetch(`/wit/user`);
  const list = res.json();
  return list;
};

// 특정 유저의 wit List 호출하는 Fetch
export const WitUserFetch = async (user_id) => {
  const res = await fetch(`/wit/user/${user_id}`);
  const list = res.json();
  return list;
};

// wit id로 wit 검색하기
export const WitIdSearchFetch = async (user_id, wit_id) => {
  const res = await fetch(`/wit/detail/${wit_id}`);
  const list = res.json();
  return list;
};

// 파일 정보 셋하기
const dataInsert = (wit, files) => {
  const fData = new FormData();
  if (files) {
    for (let i = 0; i < files.length; i++) {
      fData.append("file", files[i]);
    }
  }
  fData.append("wit", JSON.stringify(wit));
  return fData;
};

//wit Insert
export const WitInsertFetch = async (wit, files) => {
  const fData = dataInsert(wit, files);
  const fetch_option = {
    method: "POST",
    body: fData,
  };
  await fetch("/wit", fetch_option);
};

// wit 삭제 Fetch
export const WitDelete = async (user_id, id) => {
  const fetch_option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  };

  await fetch(`/wit/${user_id}/${id}`, fetch_option);
};

// wit search Fetch
export const WitSearchFetch = async (keyword) => {
  const result = await fetch(`/wit/search?q=${keyword}`);
  const json = result.json();
  return json;
};

// wit를 folder에 넣기
export const WitInFolderFetch = async (id, folder_id, list) => {
  const fetch_option = fetchPostOption(list);
  await fetch(`/wit/${id}/${folder_id}`, fetch_option);
};

//위마크하기
export const WitMarkFetch = async (wit, _wit) => {
  const wit_id = _wit.id;
  const fetch_option = fetchPostOption(wit);
  await fetch(`/wit/wimark/${wit_id}`, fetch_option);
};

// 인용하기
export const WitQuoteFetch = async (wit, wit_id) => {
  const fetch_option = fetchPostOption(wit);
  await fetch(`/wit/quote/${wit_id}`, fetch_option);
};

// 답글달기
export const WitReplyFetch = async (wit, wit_id) => {
  const fetch_option = fetchPostOption(wit);
  await fetch(`/wit/reply/${wit_id}`, fetch_option);
};
