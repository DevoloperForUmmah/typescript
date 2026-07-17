import type { Request, Response } from "express";
import { authServices } from "./auth.services.js";

const userLogin = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await authServices.userLogin(req.body);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: false,
      sameSite: "none",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: false,
      sameSite: "none",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });

    res.status(201).json({
      success: true,
      message: "user login successfully",
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

const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken as string;

  try {
    const result = await authServices.refreshToken(token);
    res.cookie("accessToken", result, {
      httpOnly: false,
      sameSite: "none",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(201).json({
      success: true,
      message: "",
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

export const authControler = {
  userLogin,
  refreshToken,
};
