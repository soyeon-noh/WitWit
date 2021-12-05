import folders from "../../../models/myroom/folder.js";
import wits from "../../../models/wit.js";
import { v4 } from "uuid";

export const fMain = async (req, res) => {
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

export const fAdd = async (req, res) => {
  const folder = new folders({
    id: v4(),
    user_id: req.body.user_id,
    name: req.body.name,
    secret: req.body.secret,
  });
  await folder.save(folder);
  res.send("저장완료");
};

export const fUpdate = async (req, res) => {
  await folders
    .updateOne(
      { id: req.body.id },
      {
        $set: { name: req.body.name, secret: req.body.secret },
      },
      function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(wits);
      }
    )
    .clone();
};

export const fDelete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await folders
    .deleteOne({ id: id })
    .then((output) => {
      if (output.n == 0)
        return res.status(404).json({ message: "post not found" });
      console.log("삭제완료");
      res.status(200).json({
        message: "delete sucess",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

export const fInfo = async (req, res) => {
  await wits.find({ id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    }
  });
};
