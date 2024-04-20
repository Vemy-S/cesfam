import { Router } from "express";
import authRequired from "../middlewares/authRequired.js";
import {
  getReservations,
  hourReservation,
  cancelReservation,
} from "../controllers/appointments.controllers.js";

const router = Router();

router.get("/appointments", authRequired ,getReservations);
router.post("/appointments", authRequired ,hourReservation);
router.delete("/appointments", authRequired ,cancelReservation);

export default router;
