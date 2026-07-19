import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { userRoutes } from "./modules/user/user.route.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/notFound.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send(" typescript express");
});

//api
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// not route found

app.use(notFound);

// global error handler

app.use(globalErrorHandler);

export default app;
