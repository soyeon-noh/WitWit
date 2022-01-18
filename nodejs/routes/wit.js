import express from "express";
import multerUpload from "../modules/fileuploadConfig.js";
import * as witCtrl from "./wit.ctrl.js";

const router = express.Router();

/* GET home page. */
// wit 전체 불러오기
router.get("/", witCtrl.getAllWit);

// 로그인한 유저의 wit 전체 불러오기
router.get("/user", witCtrl.getLoginUserWit);
// 특정 유저의 wit 전체 불러오기
router.get("/user/:user_id", witCtrl.getUserWit);

// wit 검색
router.get("/search", witCtrl.search);
// wit 디테일
router.get("/detail/:wit_id", witCtrl.detail);

// 단순 추가
router.post("/", multerUpload.array("file"), witCtrl.insertWit);
// 답글 추가
router.post("/reply/:wit_id", witCtrl.createReply);
// 위마크하기
router.post("/wimark/:wit_id", witCtrl.wimark);
// 인용하기
router.post("/quote/:wit_id", witCtrl.quote);

// wit 삭제
router.delete("/:user_id/:wit_id", witCtrl.deleteWit);
// wit 를 folder에 추가
router.post("/:wit_id/:folder_id", witCtrl.putWitIntoFolder);

export default router;
