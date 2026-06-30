import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { pool } from "../db/db";
import type { ROLES } from "../types";



const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.headers);
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.jwtSecret as string,
      ) as JwtPayload;
      const userData = await pool.query(
        `
      SELECT * FROM users WHERE email = $1
      `,
        [decoded?.email],
      );
      const user = userData.rows[0];
      if (userData.rows.length === 0) {
        res.status(401).json({
          success: false,
          message: "User Not Exist",
        });
      }

      if (roles.length && !roles.includes(user.role)) {
        res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
