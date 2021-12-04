import folders from "../../../models/myroom/folder.js";
import wits from "../../../models/wit.js";

export const folderMain = async (req, res) => {
  //   await folders //folders document 생성
  //     .save()
  //     .then(() => {
  //       console.log("성공");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  await folders
    .find({ user_id: req.params.user_id }, function (err, data) {
      res.json(data);
    })
    .clone();
};

export const folderAdd = async (req, res) => {
  const folder = new folders({
    user_id: req.body.user_id,
    folder_name: req.body.folder_name,
    secret: req.body.secret,
  });

  await folder.create(req.body);
};

export const updateFolder = async (req, res) => {
  await wits
    .updateOne(
      { _id: req.body.witId },
      { $set: { folder_id: req.body.folderId } },
      function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(wits);
      }
    )
    .clone();
};

export const folderDelete = async (req, res) => {
  await folders.deleteOne(req.body, function (req, res) {
    console.log("삭제완료");
  });
  await res.send("삭제완료");
};

export const folderInfo = async (req, res) => {
  await wits.find({ folder_id: req.body.folderId }, function (err, result) {
    if (err) {
      res.send(err);
    }
  });
};
