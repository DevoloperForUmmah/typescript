import { Router } from "express";
import { authControler } from "./auth.controller.js";


const router=Router();

router.post('/login',authControler.userLogin)


export const authRoutes=router