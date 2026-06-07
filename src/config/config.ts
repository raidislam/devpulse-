import dotenv from "dotenv";

dotenv.config({});

export const config = {
  port: process.env.PORT,
  dbConnection: process.env.DB_CONNECTION,
  jwtSecret: process.env.SECRET_JWT_ACCESS_KEY,
  jwtRefresh: process.env.SECRET_JWT_REFRESH_KEY,
};
