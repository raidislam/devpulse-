import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: config.dbConnection,
});

const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                ID SERIAL PRIMARY KEY NOT NULL,
                NAME VARCHAR(255),
                EMAIL VARCHAR(255) NOT NULL UNIQUE,
                PASSWORD VARCHAR(255) NOT NULL,
                ROLE VARCHAR(255) DEFAULT 'contributor' CHECK (ROLE IN ('contributor', 'maintainer')),
                CREATED_AT TIMESTAMP DEFAULT NOW(),
                UPDATED_AT TIMESTAMP DEFAULT NOW()

            )
            `)
            console.log("Database connector")
  } catch (err) {
    console.log(err);
  }
};


export default initDB