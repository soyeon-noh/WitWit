import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useRoomContext = () => {
  return useContext(AppContext);
};

function RoomContextProvider({ children }) {
  const [folder, setFolder] = useState({
    id: "",
    user_id: "@c_a_y",
    wit_id: "",
    name: "",
    secret: false,
  });

  const [folderList, setFolderList] = useState([]);

  const RoomData = { folder, folderList, setFolder, setFolderList };

  return <AppContext.Provider value={RoomData}>{children}</AppContext.Provider>;
}

export default RoomContextProvider;
