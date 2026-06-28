import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import type { IUser } from "./user.interface";

const getAllUserFromDB = async () => {
  const result = await pool.query(
    `SELECT * FROM users 
    `,
  );
  return result.rows;
};

const userLoginIntoDB = async (payload: any) => {
  const { email, age, role, password } = payload;
};

export const userService = {
  getAllUserFromDB,
  userLoginIntoDB,
};
