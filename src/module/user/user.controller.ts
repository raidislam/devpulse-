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

const loginUser = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result =  await userService.userLoginIntoDB(body)
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Login Faild",
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUserFromDB();
    console.log(users);
    res.status(200).json({
      message: "Get All Users Successful",
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(401).json({
      message: "Users Not Found",
      success: false,
      data: null,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  loginUser
};
