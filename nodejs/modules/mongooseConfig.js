import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
// import path from "path/posix"; // 원래 이게 되어있었음

const exportMongooseConfig = () => {
  const dbConn = mongoose.connection;
  dbConn.once("open", () => {
    console.log("˚✧₊⁎( ˘ω˘ )⁎⁺˳✧༚ \n MongoDB Open !! \n ˚✧₊⁎⁺˳✧༚˚✧₊⁎⁺✧˳");
  });
  dbConn.on("error", () => {
    console.error;
  });

  /** dotenv : .env 파일 관리 */
  dotenv.config(path.join("./.env"));
  mongoose.connect(process.env.NODEJS_APP_MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export default exportMongooseConfig;
