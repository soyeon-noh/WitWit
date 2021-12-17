import folders from "../../../models/myroom/folder.js";
import wits from "../../../models/wit.js";
import { v4 } from "uuid";

///myroom/:user_id
export const fMain = async (req, res) => {
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
//http://localhost:3000/@userID/folder/0dc85eb5-eefb-4263-9518-a54c51ebe90e
//myroom/:user_id/folder/detail/:id delete
export const fDetailDel = async (req, res) => {
  const id = req.params.id;

  await wits
    .deleteMany({ folder_id: id })
    .then(await folders.deleteOne({ id }))
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
///myroom/:user_id/folder/:id get
export const fInfo = async (req, res) => {
  await wits
    .find({ folder_id: req.params.id }, function (err, result) {
      if (err) {
        res.stauts(404).send(err);
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
          res.status(404).send(err);
        }
      }
    )
    .clone();
};
