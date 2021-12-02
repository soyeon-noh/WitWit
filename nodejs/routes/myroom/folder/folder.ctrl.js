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
//CREATE
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
  await folder.insertOne(folder, function (err, result) {
    res.result("sucess");
  });
};
//Update
export const updateFolder = async (req, res, next) => {
  const folderId = req.params.folder_id;

  const { folder_name, sceret } = req.body;

  try {
    let folder = await new FolderSchema.findById(folder_id);

    if (!folder) return res.status(404).json({ message: " Folder not Found " });

    folder.folder_name = folder_name;
    folder.secret = secret;

    let output = await folder.save();

    console.log("!! Update complete !!");

    res.satus(200).json({
      message: "Update success",
      data: {
        folder: output,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// export const getFolderById = async (req, res, next) => {
//user_id의  폴더가져오기 findAll
//   try {
//     const user = req.body.user_id;
//   } catch (err) {
//     console.log(err);
//   }
// };
export const ctrlFolder = (req, res) => {
  //user_id 의 folder 수정삭제 컨트롤러창
  //folder_id 로 id 값을 검색해서 내용을 수정함
  const folder = new FolderSchema({
    user_id: userId,
  });
};
// export const folderDelete = (req, res) => {
//   //user_id 의 folder_id 삭제
//   const { user_id, folder_id } = req.param;
// };
