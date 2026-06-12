import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashPassword =  await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
        INSERT INTO users (NAME,EMAIL,PASSWORD,ROLE) VALUES($1,$2,$3,$4)
        RETURNING *
        `,
    [name, email, hashPassword, role],
  );

  return result.rows[0];
};

const getAllUserFromDB = async () => {
  const result = await pool.query(
    `SELECT * FROM users 
    `,
  );
  return result.rows;

};


const userLoginIntoDB = async(payload)=>{
  const {email,age,role,password} = payload

}

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  userLoginIntoDB
};
