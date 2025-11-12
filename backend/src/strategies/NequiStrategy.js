import IPaymentStrategy from "./IPaymentStrategy.js";
import { registerPaymentStrategy } from "./PaymentRegistry.js";

class NequiStrategy extends IPaymentStrategy {
  procesarPago(amount) {
    return `(STRATEGY) Pago realizado con Nequi por $${amount}`;
  }
}

registerPaymentStrategy("nequi", NequiStrategy);

export default NequiStrategy;
