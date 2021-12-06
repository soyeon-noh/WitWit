import { useWitContext } from "../context/WitContextProvider";
import { useRoomContext } from "../context/RoomContextProvider";
import { useCallback, useState } from "react";

// const { folderList, setFolderList } = useRoomContext();

// export const useWitFetch = useCallback(async (setWitList) => {
//   const res = await fetch("http://localhost:5050/");
//   const list = await res.json();

//   await setWitList(list);
// }, []);

// export const useFolderFetch = useCallback(async (setFolderList) => {
//   const userid = "@userID";
//   const res = await fetch(`http://localhost:5050/${userid}`);
//   const folder = await res.json();
//   await setFolderList(folder);
// }, []);
