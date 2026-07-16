import { model, Schema } from "mongoose";
import type { ICreateUser } from "./user.interface.js";

export const userSchema = new Schema<ICreateUser>({
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
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

export const userModel = model("users", userSchema);
