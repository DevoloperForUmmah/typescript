import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    mongoose.connect(config.database_url as string);
    console.log("conect db successfully");
  } catch (error) {
    console.log(" db no conected successfully");
  }
};

export default connectDB;
