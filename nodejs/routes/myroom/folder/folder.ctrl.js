import mongoose from "mongoose";
import FolderSchema from "../../../models/myroom/folder.js";
import wits from "../../../models/wit.js";
import USER from "../../../models/user.js";

const folder_test = [
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

export const folderMain = async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  await FolderSchema.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    result.reverse();
    // res.json(folder_test);
    res.json(result);
  });
};
//CREATE
export const folderAdd = async (req, res) => {
  // user_id 의 folder_id 추가

  const userId = req.params.user_id;

  const folderName = req.body.folder_name;
  const secret = req.body.secret;
  const folder = new FolderSchema({
    user_id: userId,
    folder_name: folderName,
    secret: secret,
  });
  await folder.create(req.body);
  //   await folder.insertOne(folder, function (err, result) {
  //     res.result("sucess");
  //   });
};
//Update
export const updateFolder = async (req, res, next) => {};

export const folderDelete = (req, res) => {
  //user_id 의 folder_id 삭제
  const { user_id, folder_id } = req.param;
};
