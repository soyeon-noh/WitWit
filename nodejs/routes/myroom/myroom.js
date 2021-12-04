import express from "express";

import * as folderCtrl from "../myroom/folder/folder.ctrl.js";

const myroom = express.Router();
const folder = express.Router();

const user_test = [
  {
    user_id: "test",
    folder_id: "test",
    folder_name: "test",
    wit_id: [1, 2, 3, 4],
    secret: true,
  },
  {
    user_id: "test2",
    folder_id: "test2",
    folder_name: "test2",
    wit_id: [1, 2, 3, 4],
    secret: true,
  },
  {
    user_id: "test3",
    folder_id: "test3",
    folder_name: "test3",
    wit_id: [1, 2, 3, 4],
    secret: true,
  },
];

myroom.get("/:user_id", folderCtrl.folderMain);

//Myroom folder 관리
//추후 로그인정보로 확인하도록 한다:user_id 빼고
myroom.put("/update", folderCtrl.updateFolder);
// folder.post("/", folderCtrl.getFolderById);
// folder.get(
//   "/:user_id/insert",
//   folderCtrl.ctrlFolder
//   //내용물 추가삭제, 정렬을 진행할수 있다.(예정)
// );
myroom.post("/:user_id/add", folderCtrl.folderAdd);
myroom.post("/:user_id/delete/:folder_id", folderCtrl.folderDelete);

export default myroom;
