import folders from "../../../models/myroom/folder.js";
import wits from "../../../models/wit.js";

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
// const sample = new folders(folder_test[1]);
// sample.save();
export const folderMain = async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  //   await folders //folders document 생성
  //     .save()
  //     .then(() => {
  //       console.log("성공");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  await folders
    .find({ user_id: user_id }, function (err, data) {
      res.json(data);
    })
    .clone(); //일반적으로 쿼리문이 두번실행될수없기때문이 clone()처리를 해준다
};
//CREATE
export const folderAdd = async (req, res) => {
  // user_id 의 folder_id 추가

  const userId = req.params.user_id;

  const folderName = req.body.folder_name;
  const secret = req.body.secret;
  const folder = new folders({
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
//test_wit_id :  499c24d4-c909-439d-b018-a5a09cd400f2
export const updateFolder = async (req, res) => {
  //   const { wit_id, user_id, folder_id } = req.params;
  console.log(req.body);

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
export const folderDelete = (req, res) => {
  //user_id 의 folder_id 삭제
  folders.deleteOne(req.body, function (req, res) {
    console.log("삭제완료");
  });
  res.send("삭제완료");
};
