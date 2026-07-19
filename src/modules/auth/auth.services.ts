import bcrypt from "bcryptjs";
import { userModel } from "../user/user.model.js";
import type { ILoginUser } from "./auth.interface.js";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { utils } from "../../utils/jwt.js";
import config from "../../config/index.js";

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

  // const accessToken = jwt.sign(jwtPayload, "sifsnfns", {
  //   expiresIn: 1000 * 60 * 60 * 24 * 1,
  // });

  const accessToken = utils.createToken(
    jwtPayload,
    config.jwt_secrect,
    config.jwt_access_expire_in as SignOptions,
  );

  const refreshToken = jwt.sign(jwtPayload, "osfhsfh", {
    expiresIn: 1000 * 60 * 60 * 24 * 15,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("token missing");
  }

  try {
    const verifyToken = jwt.verify(refreshToken, "osfhsfh") as JwtPayload;
    const userEmail = verifyToken.email;

    const user = await userModel.findOne({ email: userEmail });
    const jwtPayload = {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      status: user?.status,
    };

    const accessToken = jwt.sign(jwtPayload, "sifsnfns", {
      expiresIn: 1000 * 60 * 60 * 24 * 1,
    });
    return accessToken;
  } catch (error) {
    throw new Error("invaild token");
  }
};

export const authServices = {
  userLogin,
  refreshToken,
};
