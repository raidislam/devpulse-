import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
const router = Router();

router.post("/signup", userController.createUser);
router.get("/users", userController.getAllUsers);

export const userRoutes = router;
