import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
const router = Router();

router.get("/users", userController.getAllUsers);

export const userRoutes = router;
