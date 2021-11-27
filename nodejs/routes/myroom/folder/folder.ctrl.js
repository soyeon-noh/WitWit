import mongoose from "mongoose";
import FolderSchema from "../../../models/myroom/folder.js";
import USER from "../../../models/user.js";

const user = {
  user_id: "test",
};

export const folderMain = async (req, res) => {
  await console.log(req.body);
  await res.send("hi");
  // res.json(user);
};
export const getFolderById = async (req, res, next) => {
  //user_id의  폴더가져오기 findAll
  try {
    const users = await USER.find({
      user_id: req.params.user_id,
    }).populate("user_id");
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(err);
    next(err);
  }
};
export const ctrlFolder = (req, res) => {
  //user_id 의 folder 수정삭제 컨트롤러창
  const { user_id } = req.params;
};
export const folderAdd = (req, res) => {
  // user_id 의 folder_id 추가
  const { user_id, folder_id } = req.param;
};
export const folderDelete = (req, res) => {
  //user_id 의 folder_id 삭제
  const { user_id, folder_id } = req.param;
};
