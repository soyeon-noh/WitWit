import express from "express";

import * as folderCtrl from "../myroom/folder/folder.ctrl.js";

const myroom = express.Router();

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

export default myroom;
