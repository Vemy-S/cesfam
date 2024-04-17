import { Router } from "express";
import {
  getHours,
  hourReservation,
  cancelReservation,
} from "../controllers/appointments.controllers.js";

const router = Router();

router.get("/appointments", getHours);
router.post("/appointments", hourReservation);
router.delete("/appointments", cancelReservation);

export default router;
