import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await authService.loginUserIntoDB(body);
    res.status(201).json({
      message: "Registration Successful",
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      message: "Registration Failed",
      success: false,
      data: null,
    });
  }
};


export const authController = { loginUser };