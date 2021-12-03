import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useRoomContext = () => {
  return useContext(AppContext);
};

function RoomContextProvider({ children }) {
  const [folder, setFolder] = useState({
    id: "FolderSEQ",
    user_id: "UserID",
    wit_id: "witID",
    name: "폴더이름1",
    secret: true,
  });

  const [folder1] = useState({
    id: "FolderSEQ",
    user_id: "UserID",
    wit_id: "witID",
    name: "길고긴폴더이름길고긴폴더이름길고긴폴더이름길고긴폴더이름길고긴폴더이름",
    secret: true,
  });
  const [folder2] = useState({
    id: "FolderSEQ",
    user_id: "UserID",
    wit_id: "witID",
    name: "폴더이름3",
    secret: true,
  });
  const [folder3] = useState({
    id: "FolderSEQ",
    user_id: "UserID",
    wit_id: "witID",
    name: "폴더이름4",
    secret: true,
  });

  const [folderList, setFolderList] = useState([
    folder,
    folder1,
    folder2,
    folder3,
  ]);

  const RoomData = { folder, folderList, setFolder, setFolderList };

  return <AppContext.Provider value={RoomData}>{children}</AppContext.Provider>;
}

export default RoomContextProvider;
