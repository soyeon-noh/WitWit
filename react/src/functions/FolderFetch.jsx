//folder 정보 호출하는 Fetch
export const FolderFetch = async (user_id) => {
  const res = await fetch(`/myroom/${user_id}`);
  const folder = await res.json();
  return folder;
};

// foder 속 wit들을 호출하는 Fetch
export const FolderDetailFetch = async (user_id, id) => {
  const res = await fetch(
    `/myroom/${user_id}/folder/${id}`
  );
  const fWits = await res.json();
  return fWits;
};

// folder 만들기
export const FolderInsertFetch = async (user_id, folder) => {
  const fetch_option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folder),
    
  };
  await fetch(`/myroom/${user_id}/folder`, fetch_option);
};

// 폴더 정보 검색하기
export const FolderFindFetch = async (id) => {
  // myroom.get("/folderFind/:id", folderCtrl.fFind);
  const res = await fetch(`/myroom/folderFind/${id}`);
  const info = await res.json();
  return info;
};

//폴더 정보 갱신하기
export const FolderUpdateFetch = async (user_id, folder) => {
  // myroom.put("/:user_id/folder", folderCtrl.fUpdate);
  const fetch_option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folder),
  };
  await fetch(`/myroom/${user_id}/folder`, fetch_option);
};

//폴더 삭제하기
export const FolderDeleteFetch = async (user_id, folder) => {
  const id = folder.id;
  const fetch_option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folder),
  };
  await fetch(
    `/myroom/${user_id}/folder/${id}`,
    fetch_option
  );
};
