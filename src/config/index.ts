import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  prot: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  jwt_secrect: process.env.JWT_SECRECT!,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPRIE_IN as string,
};
