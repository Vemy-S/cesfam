import { Router } from "express";
import { pool } from "../db.js";
import {
  loginuser,
  register,
  profile,
  logout,
  logindoctor,
} from "../controllers/auth.controllers.js";
import authRequired from "../middlewares/authRequired.js";
import validateSchema from "../middlewares/validator.middleware.js";
import {loginUserSchema} from "../schemas/auth.schema.js";

const router = Router();

router.get("/testconnect", async (req, res) => {
  const query = await pool.query("SELECT * FROM user");
  res.send(query);
});

router.post("/loginuser", validateSchema(loginUserSchema), loginuser);
router.post("/logindoctor", logindoctor);
router.post("/logout", authRequired, logout);


export default router;
