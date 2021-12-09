

//folder 정보 호출하는 Fetch
export const FolderFetch = async(user_id) =>{
    const res = await fetch(`http://localhost:5050/myroom/${user_id}`);
    const folder = await res.json();
    return folder
  
}

// foder 속 wit들을 호출하는 Fetch
export const FolderDetailFetch = async(user_id, id) => {
  const res = await fetch(`http://localhost:5050/myroom/${user_id}/folder/${id}`);
  const fWits = await res.json();
  return fWits
}

export const FolderInsertFetch = async(user_id, folder)=>{
  const fetch_option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folder),
  };
  await fetch(`http://localhost:5050/myroom/${user_id}/folder`, fetch_option);
}
