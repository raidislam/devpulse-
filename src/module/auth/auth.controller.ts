import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await authService.loginUserIntoDB(body);
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      message: "Login Failed",
      success: false,
      data: null,
    });
  }
};


const signupUser = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const result = await authService.createUserIntoDB(body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "Registration Failed",
      errors: err.message,
    });
  }
};


export const authController = { loginUser,signupUser };