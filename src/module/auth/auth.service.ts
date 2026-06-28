import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import type { IUser } from "../user/user.interface";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role = "contributor" } = payload;

  const existingUser = await pool.query(
    `
    SELECT id FROM users WHERE email = $1
    `,
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;

  return result.rows[0];
};
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email:user.email
  };

  const token = jwt.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: "1d",
  });

  delete user.password;

  return {
    token,
    user,
  };
};
export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
