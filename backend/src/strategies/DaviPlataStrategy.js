import IPaymentStrategy from "./IPaymentStrategy.js";
import { registerPaymentStrategy } from "./PaymentRegistry.js";

class DaviPlataStrategy extends IPaymentStrategy {
  procesarPago(amount) {
    return `(STRATEGY) Pago realizado con DaviPlata por $${amount}`;
  }
}

registerPaymentStrategy("daviPlata", DaviPlataStrategy);

export default DaviPlataStrategy;
