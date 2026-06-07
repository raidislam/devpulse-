import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await userService.createUserIntoDB(body);
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

const getAllUsers = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "All Users Found Successfull",
    success: true,
    data: [],
  });
};

export const userController = {
  createUser,
  getAllUsers
};
