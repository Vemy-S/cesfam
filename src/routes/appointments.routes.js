import { Router } from "express";
import authRequired from "../middlewares/authRequired.js";
import {
  hourReservation,
  cancelReservation,
} from "../controllers/appointments.controllers.js";

const router = Router();

router.post("/appointments", authRequired ,hourReservation);

router.put("/appointments", authRequired ,cancelReservation);

export default router;
