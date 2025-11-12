import { Router } from "express";
import {
  processPaymentNoStrategyController,
  processPaymentWithStrategyController,
  getAvailableMethods,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/process-no-strategy", processPaymentNoStrategyController);
router.post("/process", processPaymentWithStrategyController);
router.get("/methods", getAvailableMethods);

export default router;
