import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
const router = Router();

router.post("/login",userController.loginUser);
router.get("/users", userController.getAllUsers);

export const userRoutes = router;
