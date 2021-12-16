// wit List 호출하는 Fetch
// 수정 필요 로그인에 따라 다르게
export const WitFetch = async () => {
  const res = await fetch("http://localhost:5050/wit");
  const list = await res.json();
  return list;
};

//wit Insert
export const WitInsertFetch = async (wit) => {
  const fetch_option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wit),
  };

  await fetch("http://localhost:5050/wit", fetch_option);
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

  await fetch(`http://localhost:5050/wit/${user_id}/${id}`, fetch_option);
};

// wit search Fetch
export const WitSearchFetch = async (keyword) => {
  const result = await fetch(`http://localhost:5050/wit/search?q=${keyword}`);
  const json = await result.json();
  return json;
};

// wit를 folder에 넣기
export const WitInFolderFetch = async (id, folder_id, list) => {
  const fetch_option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  };

  await fetch(`http://localhost:5050/wit/${id}/${folder_id}`, fetch_option);
};

//위마크하기
export const WitMarkFetch = async (wit) => {
  const wit_id = wit.id;
  const fetch_option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wit),
  };
  await fetch(`http://localhost:5050/wit/wimark/${wit_id}`, fetch_option);
};
