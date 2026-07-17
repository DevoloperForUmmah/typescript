import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userModel } from "./user.model.js";
import { userServices } from "./user.service.js";

const creatuser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);

  
    res.status(201).json({
      success: true,
      message: "user register successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  creatuser,
};
