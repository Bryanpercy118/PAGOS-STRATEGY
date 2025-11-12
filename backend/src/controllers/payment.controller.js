import {
  processPaymentNoStrategy,
  processPaymentWithStrategy,
  getAvailableMethodsService,
} from "../services/payment.service.js";

// SIN STRATEGY
export const processPaymentNoStrategyController = async (req, res) => {
  const { method, amount } = req.body;
  const result = await processPaymentNoStrategy({ method, amount });
  return res.status(result.ok ? 200 : 400).json(result);
};

// CON STRATEGY
export const processPaymentWithStrategyController = async (req, res) => {
  const { method, amount } = req.body;
  const result = await processPaymentWithStrategy({ method, amount });
  return res.status(result.ok ? 200 : 400).json(result);
};

// MÉTODOS DISPONIBLES
export const getAvailableMethods = (req, res) => {
  const methods = getAvailableMethodsService();
  return res.json({ ok: true, methods });
};
