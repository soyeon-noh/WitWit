import mongoose from "mongoose";
import FolderSchema from "../../../models/myroom/folder.js";
import USER from "../../../models/user.js";

export const folderMain = (req, res) => {
  FolderSchema.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};
export const folderAdd = async (req, res) => {
  // user_id 의 folder_id 추가

  const userId = req.params.user_id;

  const folderName = req.body.name;
  const secret = req.body.secret;

  const folder = new FolderSchema({
    user_id: userId,
    folder_name: folderName,
    secret: secret,
  });
  try {
    await folder.save();
    await res.send("sucess");
  } catch (err) {
    console.log(err);
  }
};
// export const getFolderById = async (req, res, next) => {
//   //user_id의  폴더가져오기 findAll
//   try {
//     const user = req.body.user_id;
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const ctrlFolder = (req, res) => {
//   //user_id 의 folder 수정삭제 컨트롤러창
//   const { user_id } = req.params;
// };
// export const folderDelete = (req, res) => {
//   //user_id 의 folder_id 삭제
//   const { user_id, folder_id } = req.param;
// };
