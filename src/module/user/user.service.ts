import { pool } from "../../db/db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const result = await pool.query(
    `
        INSERT INTO users (NAME,EMAIL,PASSWORD,ROLE) VALUES($1,$2,$3,$4)
        RETURNING *
        `,
    [name, email, password, role],
  );

  return result.rows[0];
};

export const userService = {
  createUserIntoDB,
};
