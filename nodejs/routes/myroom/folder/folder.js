/* myroomfolder.js */

import Folder from "../../../models/myroom/folder.js";
import express from "express";
import * as folderCtrl from "./folder.ctrl.js";

const folder = express.Router();

//Myroom folder 관리
folder.get("/", folderCtrl.getFolderById);
folder.get(
  "/:user_id/insert",
  folderCtrl.ctrlFolder
  //내용물 추가삭제, 정렬을 진행할수 있다.(예정)
);
folder.post("/:user_id/add/:folder_id", folderCtrl.folderAdd);
folder.post("/:user_id/delete/:folder_id", folderCtrl.folderDelete);

export default folder;
