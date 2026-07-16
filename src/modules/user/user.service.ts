import bcrypt from "bcryptjs";
import { userModel } from "./user.model.js";
import type { ICreateUser } from "./user.interface.js";

const createUser = async (payload: ICreateUser) => {
  const { name, email, role, password,status } = payload;

  const userExits = await userModel.findOne({ email });
  if (userExits) {
    throw new Error("user allready exits");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await userModel.create({
    name: name,
    email: email,
    password: hashPassword,
    role: role,
    status:status
  });

  return createUser;
};

export const userServices = {
  createUser,
};
