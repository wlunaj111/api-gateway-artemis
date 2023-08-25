import { Router } from "express";
import {
  getPeripherals,
  createPeripheral,
  getPeripheral,
  updatePeripheral,
  deletePeripheral
} from "../controllers/peripheral.controller.js";

const router = Router();

router.get("/peripherals", getPeripherals);
router.get("/peripherals/:id", getPeripheral);
router.post("/peripherals", createPeripheral);
router.delete('/peripherals/:id', deletePeripheral)
router.put('/peripherals/:id', updatePeripheral)

export default router;
