import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "author"],
    default: "user",
  },
});

export const userModel = model("users", userSchema);
