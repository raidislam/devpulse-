import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import type { IUser } from "../user/user.interface";

const loginUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email = $1 `,
    [ email],
  );

  if(result.rows.length === 0){
    throw new Error("User Not Found");
  }

 const user = result.rows[0];
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return user;
    }
  }
  return null;
};

export const authService = {
  loginUserIntoDB,
};