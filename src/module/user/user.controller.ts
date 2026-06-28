import type { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUserFromDB();
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
  getAllUsers,
};
