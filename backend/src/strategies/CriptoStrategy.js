import IPaymentStrategy from "./IPaymentStrategy.js";
import { registerPaymentStrategy } from "./PaymentRegistry.js";

class CriptoStrategy extends IPaymentStrategy {
  procesarPago(amount) {
    return `🪙 (STRATEGY) Pago aprobado con Criptomonedas por $${amount}`;
  }
}

registerPaymentStrategy("cripto", CriptoStrategy);
export default CriptoStrategy;
