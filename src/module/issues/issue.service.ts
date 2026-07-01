import { issueController } from "./issue.controller";
import { pool } from "../../db/db";

const createIssueIntoDB = async (
  payload: {
    title: string;
    description: string;
    type: "bug" | "feature_request";
  },
  user: {
    id: number;
    name: string;
    role: "contributor" | "maintainer";
  },
) => {
  const { title, description, type } = payload;
  const reporterId = user.id;


  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, reporterId],
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async () => {
  const result = await pool.query(
    `
        SELECT * FROM issues
        `,
  );
  return result.rows;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await pool.query(
    `
        SELECT * FROM issues WHERE id = $1
        `,
    [id],
  );
  return result.rows[0];
};

const issueUpdateServiceFromDB = async (id: number, payload: any) => {
  const { title, description, type, status } = payload;

  const result = await pool.query(
    `
         UPDATE issues SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type),
        status = COALESCE($4, status),
        updated_at = NOW()
        WHERE id = $5
        RETURNING *
          `,
    [title, description, type, status, id],
  );
  return result;
};

const deleteIssueFromDB = async (id: number) => {
  const result = await pool.query(
    `
        DELETE FROM issues WHERE id = $1
        `,
    [id],
  );
  return result;
}

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleUserFromDB,
  issueUpdateServiceFromDB,
  deleteIssueFromDB
};
