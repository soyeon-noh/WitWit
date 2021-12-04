/* folder.js */

import express from "express";
import * as folderCtrl from "./folder.ctrl.js";

const folder = express.Router();

//Myroom folder 관리
//추후 로그인정보로 확인하도록 한다:user_id 빼고
folder.put("/:folder_id/update/:wit_id", folderCtrl.updateFolder);
// folder.post("/", folderCtrl.getFolderById);
// folder.get(
//   "/:user_id/insert",
//   folderCtrl.ctrlFolder
//   //내용물 추가삭제, 정렬을 진행할수 있다.(예정)
// );
folder.post("/:user_id/add", folderCtrl.folderAdd);
folder.post("/:user_id/delete/:folder_id", folderCtrl.folderDelete);

export default folder;
