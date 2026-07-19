import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);

  res.status(500).json({
    success: false,
    statusCode: 500,
    message: error.message || " internal server error",
  });
};
