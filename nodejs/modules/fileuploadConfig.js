import { v4 } from "uuid";
import multer from "multer";
import path from "path";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileType = path.extname(file.originalname);
    cb(null, v4() + fileType);
  },
});

export const multerUpload = multer({
  storage: fileStorage,
  limits: {
    files: 4, // 최대 파일 업로드 수
    fileSize: 5 * 1024 * 1024, // 5MB 로 제한
  },
});

export default multerUpload;
