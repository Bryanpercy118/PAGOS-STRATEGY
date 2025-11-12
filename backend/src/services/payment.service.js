import PaymentContext from "../strategies/PaymentContext.js";
import { getAllPaymentStrategies, getStrategyClass } from "../strategies/PaymentRegistry.js";

/**
 * ============================
 *  SIN STRATEGY
 * ============================
 * Estructura rígida: múltiples condicionales.
 * Cada nuevo método requiere modificar este archivo.
 */
export async function processPaymentNoStrategy({ method, amount }) {
  if (typeof amount !== "number" || amount <= 0) {
    return { ok: false, message: "Monto inválido" };
  }

  if (method === "tarjeta") {
    return { ok: true, message: `(NO-STRATEGY) Pago con Tarjeta por $${amount}` };
  } else if (method === "paypal") {
    return { ok: true, message: `(NO-STRATEGY) Pago con PayPal por $${amount}` };
  } else if (method === "cripto") {
    return { ok: true, message: `(NO-STRATEGY) Pago con Criptomonedas por $${amount}` };
   } else {
    return { ok: false, message: "Método no soportado" };
  }
}

/**
 * ============================
 *  CON STRATEGY
 * ============================
 * Estructura flexible: cualquier nueva estrategia se registra
 * automáticamente en PaymentRegistry sin tocar este archivo.
 */
export async function processPaymentWithStrategy({ method, amount }) {
  if (typeof amount !== "number" || amount <= 0) {
    return { ok: false, message: "Monto inválido" };
  }

  const StrategyClass = getStrategyClass(method);
  if (!StrategyClass) {
    return { ok: false, message: "Método no soportado (no registrado en Strategy)" };
  }

  const ctx = new PaymentContext();
  ctx.setStrategy(new StrategyClass());
  const result = ctx.procesarPago(amount);

  return { ok: true, message: result };
}

/**
 * Listado de estrategias registradas dinámicamente
 */
export function getAvailableMethodsService() {
  return getAllPaymentStrategies();
}
