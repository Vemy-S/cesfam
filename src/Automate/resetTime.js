import cron from "node-cron";
import { pool } from "../db.js";

export const cronReset = () => {
  return cron.schedule(
    "45 23 * * *",
    async () => {
      try {
        const resetTime = await pool.query(
          "UPDATE medicalhour SET medicalhour_status = TRUE"
        );
        const resetUser = await pool.query(
          "UPDATE user SET user_hourstatus = FALSE"
        );

        console.log("Reset time and user status");
      } catch (error) {
        console.log(error.message);
      }
    },
    { timeZone: "America/Santiago" }
  );
};