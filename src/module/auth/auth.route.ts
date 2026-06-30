import { Router } from 'express';
import { authController } from './auth.controller';
const router = Router();

router.post("/login", authController.loginUser);
router.post("/signup", authController.signupUser);
router.post("/refresh-tone",authController.refreshTokenController)


export const authRouter = router;