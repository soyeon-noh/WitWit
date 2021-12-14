import folders from "../../../models/myroom/folder.js";
import wits from "../../../models/wit.js";
import { v4 } from "uuid";

///myroom/:user_i
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

///myroom/:user_id/folder post
export const fAdd = async (req, res) => {
  const folder = new folders({
    id: v4(),
    user_id: req.body.user_id,
    name: req.body.name,
    secret: req.body.secret,
  });
  await folder.save(folder, function (err, result) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
///myroom/:user_id/folder put
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

///myroom/:user_id/folder/:id delete
export const fDelete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await folders
    .deleteOne({ id: id })
    .then(
      await wits
        .updateMany(
          {
            folder_id: id,
          },
          {
            $set: { folder_id: "삭제된 폴더" },
          },
          function (err, result) {
            {
              if (err) {
                return res.status.json({ err });
              }
            }
          }
        )
        .clone()
    )
    .then((output) => {
      if (output.n == 0)
        return res.status(404).json({ message: "post not found" });
      res.status(200).json({
        message: "delete sucess",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

//폴더 삭제할때 , 폴더 내부도 삭제를 누를 때 wits 에있는 글도 삭제가 된다
// test 0472da45-f893-427f-907c-5616c817722e
export const fDetailDel = async (req, res) => {
  const id = req.params.id;
  //wit 내부에 접근하여 id 값을 삭제한 후 folder도 삭제한다 .
  await wits.deleteMany({ folder_id: id }).then(
    await folders
      .deleteOne({ id })
      .then((output) => {
        if (output.n == 0)
          return res.status(404).json({ message: "post not found" });
        res.status(200).json({
          message: "delete sucess",
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      })
      .clone()
  );
};
///myroom/:user_id/folder/:id get
export const fInfo = async (req, res) => {
  await wits
    .find({ folder_id: req.params.id }, function (err, result) {
      if (err) {
        res.stauts(501).send(err);
      }
      res.status(200).send(result);
    })
    .clone();
};
///myroom/folderFind/:id get
export const fFind = async (req, res) => {
  console.log("fFined ", req.body);
  await folders
    .find(
      {
        id: req.params.id,
      },
      function (err, result) {
        res.status(200).json(result);
        if (err) {
          res.status(401).send(err);
        }
      }
    )
    .clone();
};
