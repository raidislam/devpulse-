import { config } from "./config/config";
import app from "./app";
import initDB from "./db/db";

const main = () => {
  app.listen(config.port, () => {
    initDB();
    console.log(`server run in ${config.port}`);
  });
};

main();
