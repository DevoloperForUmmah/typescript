import bcrypt from "bcryptjs";
import { userModel } from "../user/user.model.js";
import type { ILoginUser } from "./auth.interface.js";
import jwt from "jsonwebtoken";

const userLogin = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("user not found");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) {
    throw new Error("Invaild password");
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const accessToken = jwt.sign(jwtPayload, "sifsnfns", {
    expiresIn: 1000 * 60 * 60 * 24 * 1,
  });

  const refreshToken = jwt.sign(jwtPayload, "osfhsfh", {
    expiresIn: 1000 * 60 * 60 * 24 * 15,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  userLogin,
};
