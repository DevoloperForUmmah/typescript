import { Router } from "express";
import { authControler } from "./auth.controller.js";

const router = Router();

router.post("/login", authControler.userLogin);
router.post('/refresh-token',authControler.refreshToken)

export const authRoutes = router;
