import app from "./app.js";
import connectDB from "./config/db.js";
import config from "./config/index.js";

const main = async () => {
  //database conneciton
  connectDB();

  app.listen(config.prot, () => {
    console.log(`Server is running on http://localhost:${config.prot}`);
  });
};

main();
