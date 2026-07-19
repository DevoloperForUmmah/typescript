import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
const createToken = (
  paload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(paload, secret, { expiresIn } as SignOptions);

  return token;
};

export const utils = {
  createToken,
};
