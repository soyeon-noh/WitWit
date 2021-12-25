import WIT from "../models/wit.js";

// wit 전체 불러오는 함수
export const getWit = async (req, res, searchQuery) => {
  const result = await WIT.aggregate([
    { $match: searchQuery },
    {
      $lookup: {
        from: "likeys",
        localField: "id",
        foreignField: "wit_id",
        as: "likeys",
      },
    },
    {
      $lookup: {
        from: "wits",
        localField: "id",
        foreignField: "parentWit",
        as: "replyArray",
      },
    },
    {
      $lookup: {
        from: "wimarks",
        localField: "id",
        foreignField: "wit_id",
        as: "wimarks",
      },
    },
    // {
    //   $lookup: {
    //     from: "wits",
    //     localField: "originalWit",
    //     foreignField: "id",
    //     as: "originalWit",
    //   },
    // },
    {
      $lookup: {
        from: "files",
        localField: "id",
        foreignField: "wit_id",
        as: "fileArray",
      },
    },
    {
      $project: {
        id: 1,
        text: 1,
        createdDate: 1,
        createdTime: 1,
        userId: 1,
        userName: 1,
        profileUrl: 1,
        parentWit: 1,
        // originalWit: 1, // id값으로변경

        folder_id: 1,

        fileArray: "$fileArray",

        originalWit: "$originalWit",
        replyArray: "$replyArray",

        likeyCount: { $size: "$likeys" },
        replyCount: { $size: "$replyArray" },
      },
    },
    { $sort: { createdDate: -1, createdTime: -1 } },
  ]);
  //   console.log("wit find: ", result);
  return result;
  //   res.json(result);
};
