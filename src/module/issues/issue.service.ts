import { issueController } from "./issue.controller";
import { pool } from "../../db/db";

const createconstService = async (payload: any) => {
  const { title, description, reporter_id, type, status } = payload;

  const result = await pool.query(
    `
        INSERT INTO issues (TITLE,DESCRIPTION,REPORTER_ID,TYPE) VALUES($1,$2,$3,$4)
        RETURNING *
        `,
    [title, description, reporter_id, type],
  );
  return result;
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
  createconstService,
  getAllIssuesFromDB,
  getSingleUserFromDB,
  issueUpdateServiceFromDB,
  deleteIssueFromDB
};
