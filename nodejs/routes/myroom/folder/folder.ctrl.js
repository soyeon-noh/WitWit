import mongoose from "mongoose";

export const getFolderById = (req, res) => {
  //user_id의  폴더가져오기 findAll
  const { user_id } = req.params;
};
export const controllFolder = (req, res) => {
  //user_id 의 folder 수정삭제 컨트롤러창
  const { user_id } = req.params;
};
export const folderAdd = (req, res) => {
  // user_id 의 folder_id 추가

  const { user_id, folder_id } = req.param;
};
export const folderDelete = (req, res) => {
  //user_id 의 folder_id 삭제
};
