import { Router } from "express";
import authRequired from "../middlewares/authRequired.js";
import {
  hourReservation,
  cancelReservation,
} from "../controllers/appointments.controllers.js";

const router = Router();

router.post("/appointments", authRequired ,hourReservation); // Pedir hora
router.put("/appointments", authRequired ,cancelReservation); // Cancelar hora

export default router;
